
// Default Import
import  express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"; 

//Custom Import
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";
import passport from "passport";

mongoose.set('strictQuery',true);

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'dkjhskjskkjsfbk1212klakdadf2', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  }));
app.use(passport.initialize());
app.use(passport.session());

dotenv.config()
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB!!")
    }
    catch(error){
        console.log(error)
    }
}

app.use("/api/auth",authRoute)
app.use("api/users",userRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800,()=>{
    connect()
    console.log("Backend Server is running!")
})