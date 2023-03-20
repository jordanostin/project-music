import mongoose from 'mongoose';
import express from "express";
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import {auth} from './middleware/auth.js'
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = 9200;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL);


mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
    app.use('/admin', [auth.verifyToken, auth.isAdmin], adminRouter );
    app.use('/user', [auth.verifyToken], userRouter);
    app.use('/auth', authRouter);
})



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});