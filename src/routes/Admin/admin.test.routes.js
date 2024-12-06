import { Router } from 'express';
import { fetchTest, createTest, addQuestionsInTest, fetchCurrentTest, completeTest, deleteTest } from '../../controller/Admin/admin.test.controller.js';
import { isAdminLogin } from '../../middleware/admin.auth.js';
import { upload } from '../../middleware/multer.middleware.js';

const testRouter = Router();

testRouter.route("/fetchTest").get(
   isAdminLogin,
   fetchTest
)

testRouter.route("/fetchCurrentTest/:id").get(
   isAdminLogin,
   fetchCurrentTest
)

testRouter.route("/createTest").post(
   isAdminLogin,
   upload.none(),
   createTest
)

testRouter.route("/addQuestionsInTest/:id").post(
   isAdminLogin,
   addQuestionsInTest
)


testRouter.route("/completeTest/:id").post(
   isAdminLogin,
   upload.none(),
   completeTest
)


testRouter.route("/deleteTest/:id").delete(
   isAdminLogin,
   upload.none(),
   deleteTest
)


export default testRouter;