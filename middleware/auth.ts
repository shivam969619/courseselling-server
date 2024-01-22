import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import  Jwt,{JwtPayload} from "jsonwebtoken";
import {redis} from "../utils/redis";
//authenticate duser
export const isAuthenticated=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const access_token=req.cookies.access_token;
    if(!access_token){
        return next(new ErrorHandler("Please login to access this resourse",400));
    }
const decoded=Jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload;
if(!decoded){
    return next(new ErrorHandler("access token is not valid",400));
}
const user=await redis.get(decoded.id);

if(!user){
    return next(new ErrorHandler("user not found",400));
}
req.user=JSON.parse(user);
next();

});


//validate user role
export const authorizeRoles=(...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role||'')){
            return next(new ErrorHandler(`Role${req.user?.role}is not defined`,403));
        }
        next();
    }
}