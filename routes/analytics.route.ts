import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getCoursesANalytics, getOrdersANalytics, getUsersANalytics } from '../controllers/analytics.controllers';
const analyticsRouter=express.Router();
analyticsRouter.get("/get-users-analytics",isAuthenticated,authorizeRoles("admin"),getUsersANalytics);
analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizeRoles("admin"),getCoursesANalytics);
analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizeRoles("admin"),getOrdersANalytics);
export default analyticsRouter;
