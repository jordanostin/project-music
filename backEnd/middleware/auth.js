import jwt from 'jsonwebtoken'
import userSchema from "../models/userSchema.js";

const verifyToken = (req, res, next) => {

    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];
    
    if(!token){
        return res.status(401).json({mesage : 'no token provided'})
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        
        if(err){
            res.status(403).json({message : 'Unauthorized'});
            return
        }
        console.log(decoded);
        req.userId = decoded._id
        
        next()
    });
}

const isAdmin = (req, res, next) => {
console.log(req.userId);
    userSchema.findOne({_id: req.userId})
        .then((user) => {
            console.log(user);
            if(user.isAdmin){
                next()
            } else {
                return res.status(401).send({message: "Unauthorized! 2"});
            }
        })
        .catch((err) => res.status(401).send({message: "Unauthorized! 3"}))
}

export const auth = {
    isAdmin,
    verifyToken
}