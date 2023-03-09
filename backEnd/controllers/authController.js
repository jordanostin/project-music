import userSchema from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = (req, res) => {

    const { name, email, password} = req.body;
    
    const user = new userSchema({
        name,
        email,
        password,
        isAdmin: email == 'milo@gmail.com',
        createdAt: Date.now(),
    })

    const token = user.createJWT();
    user.save()
    .then(() => {
        res.status(201).json({
            user:{
                name: user.name,
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt
            },
            token
        })
    })
    .catch((err) => {
        return res.status(400).json({message : 'une erreur est survenue'})
    })
};

export const login = (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    
    userSchema.findOne({ email: email })
        .then(user => {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({message : 'Une erreur est survenue'});
                }
                
                if (!match) {
                    return res.status(400).json({message : 'Identifiant invalide'});
                }else{
                    const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin, _id: user._id}, process.env.JWT);
                    user = {
                        email: email,
                        isAdmin: email === 'milo@gmail.com',
                        _id: user._id,
                    }
                    res.status(201).json({user, token})
                } 
                
            })
        })
        .catch((err) => {
            res.status(400).json({message : 'Une erreur est survenue'})
        })
   
};

export const verifyToken  = async (req, res) => {

    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if(!token){
        return res.status(401).json({mesage : 'no token provided'})
    }

    jwt.verify(token, process.env.JWT, async(err, decoded) => {
        console.log(decoded);
        if(err){
            res.status(403).json({message : 'Unauthorized'});
            return
        }

        const user = await userSchema.findOne({_id: decoded._id})
        if(!user){
            res.status(400).json({message: 'token invalide'})
        }
        res.status(200).json({
            user:{
                email: user.email,
                _id: user._id,
                isAdmin: user.isAdmin
            }
        })
    })
};

export const updateUser = (req, res) => {

    const userId = req.params.id;

    const update = {
      password: req.body.password,
      updatedAt: Date.now(),
    };

    if(req.body.password){

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({message: "erreur 1"});
            }
      
            update.password = hashedPassword;
      
            userSchema.updateOne({ _id: userId }, update)
              .then(() => {
                res.status(200).json({message : "mise à jour du mot de passe ok"});
              })
              .catch((err) => {
                console.error(err);
                res.status(500).json({message : "erreur 2"});
              });
          });

    }
    
}
