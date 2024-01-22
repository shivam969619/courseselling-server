import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { uploadCourse,editCourse, getSingleCourse,getAllCourses,getCourseByUser,addQuestion,addAnswer,addReview,addReplyToReview, deleteCourse, genrateVideoUrl, getAdminAllCourses} from '../controllers/course.controllers';
import { updateAccessToken } from '../controllers/user.controller';
const courseRouter=express.Router();
courseRouter.post("/create-course",updateAccessToken,isAuthenticated,authorizeRoles("admin"), uploadCourse);
courseRouter.put("/edit-course",updateAccessToken,isAuthenticated,authorizeRoles("admin"), editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-course",getAllCourses);
courseRouter.get("/get-course-content/:id",updateAccessToken,isAuthenticated,getCourseByUser);
courseRouter.put("/add-question",updateAccessToken,isAuthenticated,addQuestion);
courseRouter.put("/add-answer",updateAccessToken,isAuthenticated,addAnswer);
courseRouter.put("/add-review/:id",updateAccessToken,isAuthenticated,addReview);
courseRouter.put("/add-reply/:id",updateAccessToken,isAuthenticated,
authorizeRoles("admin"),
addReplyToReview);
courseRouter.get("/get-courses",updateAccessToken,isAuthenticated,
getAllCourses);
courseRouter.post("/getVdoCipherOTP",genrateVideoUrl)
courseRouter.delete("/delete-course/:id",updateAccessToken,isAuthenticated,
authorizeRoles("admin"),
deleteCourse);
courseRouter.get("/getAdminAllCourses",isAuthenticated,authorizeRoles("admin"),getAdminAllCourses)

export default courseRouter;