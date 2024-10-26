
import { Router } from "express";
import { fetchProfile, updateProfile } from "../../controller/Student/student.profile.controller.js";
import { isStudentLogin } from "../../middleware/student.auth.js";
import { upload } from "../../middleware/multer.middleware.js";


const profileRouter = Router();



profileRouter.route("/fetchProfile").get(
   isStudentLogin,
   fetchProfile
)

profileRouter.route("/updateProfile").post(
   isStudentLogin,
   upload.single("profilePicture"),
   updateProfile
)


export default profileRouter;