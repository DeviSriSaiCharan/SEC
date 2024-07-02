import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import connecttoMongo from './db/connecttoMongo.js';
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

import cookieParser from 'cookie-parser';
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use("/assets",express.static(path.join(_dirname,'public/assets')));



app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes)

const PORT=process.env.PORT||6001;
app.listen(PORT,()=>{
    connecttoMongo();
    console.log(`server is running on ${PORT}`);
})