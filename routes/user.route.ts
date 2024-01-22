import express from 'express';
import {activateUser, getUserInfo, loginUser, logoutUser, registrationUser,updateAccessToken,socialAuth,updateUserInfo,updatePassword,updateProfilePicture, getAllUsers, updateUserRole, deleteUser} from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const userRouter=express.Router();
userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login',loginUser);
userRouter.get('/logout',isAuthenticated ,logoutUser);
userRouter.get('/me',isAuthenticated ,getUserInfo);
userRouter.get('/refresh' ,updateAccessToken);
userRouter.post('/socialAuth' ,socialAuth);
userRouter.put("/update-user-info",updateAccessToken,isAuthenticated,updateUserInfo);
userRouter.put("/update-user-password",updateAccessToken,isAuthenticated,updatePassword);
userRouter.put("/update-user-avatar",updateAccessToken,isAuthenticated,updateProfilePicture);
userRouter.get("/get-users",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getAllUsers);
userRouter.put("/update-user-role",updateAccessToken,isAuthenticated,authorizeRoles("admin"),updateUserRole);
userRouter.delete("/delete-user/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),deleteUser);

export default userRouter;