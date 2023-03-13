import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const getUserIdFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded._id;
  
    return userId;
}

export const copyFiles = (files, pathName) => {

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime();
            const newPath = `${pathName}/${timestamp}${(Math.random() + 1).toString(36).substring(7)}${path.extname(file.originalFilename)}`;
            fs.copyFile(file.filepath, `public/${newPath}`, (err) => {
                if (err) reject(err)
                else resolve(newPath);
            });
        });
    });
    return Promise.all(promises);
};