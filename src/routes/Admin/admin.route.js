import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../../controller/Admin/admin.login.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

const adminRouter = Router();


// register admin with all access 

adminRouter.route("/register").post(
   upload.none(),
   registerAdmin
)


// login route of admin 
adminRouter.route("/login").post(
   loginAdmin
)

export default adminRouter;