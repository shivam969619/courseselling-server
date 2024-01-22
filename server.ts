import {app} from "./app"
import dotenv from 'dotenv';
import {v2 as cloudinary} from "cloudinary";
import connectDB from "./utils/db";
dotenv.config();

//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY,
});

//create our server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
   connectDB();
})