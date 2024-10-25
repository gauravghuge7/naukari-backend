import express from 'express';

import { Router } from 'express';
import adminRouter from '../routes/Admin/admin.route.js';
import studentRouter from '../routes/student/student.routes.js';



// create a common request router to handle all the requests
const connectRouter = Router();


/// all admin routes forward here 
connectRouter.use("/admin", adminRouter)


/// all student routes forward here 
connectRouter.use("/student", studentRouter)



export default connectRouter;