import { ApiError } from "../utils/ApiError"


const isStudentLogin = async(req, res, next) => {

   try {
      
      const studentAccessToken = req.cookies.studentAccessToken;

   } 
   catch (error) {
      throw new ApiError   
   }
}