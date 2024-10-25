
import { Router } from "express";
import { fetchProfile } from "../../controller/Student/student.profile.controller.js";


const profileRouter = Router();



profileRouter.route("/fetchProfile").get(
   fetchProfile
)



export default profileRouter;