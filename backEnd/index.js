import mongoose from 'mongoose';
import express from "express";
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import {auth} from './middleware/auth.js'
import cors from 'cors';


const PORT = 9200;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jordanostin:123@clusterapp.7ev62mm.mongodb.net/project-music?retryWrites=true&w=majority');


mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
    app.use('/admin', [auth.verifyToken, auth.isAdmin], adminRouter );
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
})



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});