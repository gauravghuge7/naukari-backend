import { Router } from 'express';
import { 
   loginStudent, 
   registerStudent, 
   sendOtp

} from '../../controller/Student/student.login.controller.js';
import { upload } from '../../middleware/multer.middleware.js';
import profileRouter from './student.profile.routes.js';


// create a student router to handle all the requests
const studentRouter = Router();



studentRouter.use("/profile", profileRouter);

// register a student
studentRouter.route("/sendOtp").post(
   upload.none(),
   sendOtp
)

studentRouter.route("/verifyAndRegister").post(
   upload.none(),
   registerStudent
)


// login route of a student 
studentRouter.route("/login").post(
   upload.none(),
   loginStudent
)






export default studentRouter;