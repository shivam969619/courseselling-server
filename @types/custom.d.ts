import { Request } from "express";
import userModel from "../models/user.model";
import { User } from "../models/user.model";
declare global{
    namespace Express{
        interface Request{
            user?:User
        }
    }
}