import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../../controller/Admin/admin.login.controller.js';
import { upload } from '../../middleware/multer.middleware.js';
import profileRouter from './admin.profile.route.js';
import testRouter from './admin.test.routes.js';

const adminRouter = Router();


// register admin with all access 


adminRouter.use("/profile", profileRouter);
adminRouter.use("/test", testRouter);





adminRouter.route("/register").post(
   upload.none(),
   registerAdmin
)


// login route of admin 
adminRouter.route("/login").post(
   loginAdmin
)

export default adminRouter;