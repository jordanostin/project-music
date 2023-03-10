import jwt from 'jsonwebtoken'

export const getUserIdFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded._id;
  
    return userId;
}