import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
import  jwt  from "jsonwebtoken";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAcessToken:()=>string,
    SignRefreshToken:()=>string,

}

const userSchema: Schema<User> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String,
        },
    ],
}, { timestamps: true });

// HASH PASSWORD

userSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//sign access token
userSchema.methods.SignAcessToken=function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN||'',{expiresIn:"5m"});
}

//sign refresh token

userSchema.methods.SignRefreshToken=function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN||'',{expiresIn:"7d"});
}


//compare password

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

 const userModel = mongoose.model<User>('User', userSchema);
 export default userModel;