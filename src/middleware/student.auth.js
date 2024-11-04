import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"

const isStudentLogin = asyncHandler(async(req, res, next) => {

   try {
      
      console.log("req.cookies => ", req.cookies)
      const studentAccessToken = req.cookies.studentAccessToken;

      console.log("req.cookies => ", req.cookies)

      if (!studentAccessToken) {
         throw new ApiError(400, "student access token not found")
      }

      const decoded = await jwt.verify(studentAccessToken, process.env.STUDENT_ACCESS_TOKEN);

      req.user = decoded;

      next();

   } 
   catch (error) {
      throw new ApiError(401, error.message)
   }
})

export {
   isStudentLogin
}