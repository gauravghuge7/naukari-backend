import { Router } from 'express';
import { fetchProfile, updateProfile } from '../../controller/Admin/admin.profile.controller.js';
import { isAdminLogin } from '../../middleware/admin.auth.js';
import { upload } from '../../middleware/multer.middleware.js';
import { uploadProfilePicture } from '../../controller/Admin/admin.profile.controller.js';

const profileRouter = Router();

profileRouter.route("/fetchProfile").get(
   isAdminLogin,
   fetchProfile
)

profileRouter.route("/updateProfile").post(
   isAdminLogin,
   upload.single("profilePicture"),
   updateProfile
)

profileRouter.route("/uploadProfilePicture").post(
   isAdminLogin,
   upload.single("profilePicture"),
   uploadProfilePicture
)

export default profileRouter;