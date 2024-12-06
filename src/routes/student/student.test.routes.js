
import { Router } from 'express';
import { enrollTest, fetchAllTests, fetchTestOverview } from '../../controller/Student/student.test.controller.js';
import { isStudentLogin } from '../../middleware/student.auth.js';


const studentTestRouter = Router();


studentTestRouter.route("/fetchAllTests").get(
   fetchAllTests
)

studentTestRouter.route("/fetchTestOverview/:id").get(
   fetchTestOverview
)

studentTestRouter.route("/enrollTest/:id").post(

   isStudentLogin,
   enrollTest
)

export default studentTestRouter;