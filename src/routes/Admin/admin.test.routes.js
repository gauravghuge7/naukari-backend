import { Router } from 'express';
import { fetchTest, createTest, addQuestionsInTest } from '../../controller/Admin/admin.test.controller.js';
import { isAdminLogin } from '../../middleware/admin.auth.js';
import { upload } from '../../middleware/multer.middleware.js';

const testRouter = Router();

testRouter.route("/fetchTest").get(
   isAdminLogin,
   fetchTest
)

testRouter.route("/createTest").post(
   isAdminLogin,
   upload.none(),
   createTest
)

testRouter.route("/addQuestionsInTest").post(
   isAdminLogin,
   addQuestionsInTest
)


export default testRouter;