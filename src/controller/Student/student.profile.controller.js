import { Student } from "../../models/Student/student.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";






const fetchProfile = asyncHandler(async (req, res, next) => {
   try {

      const { _id } = req.user;

      if(!_id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.findById(_id);

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Student Profile Fetched Successfully", student)
      );

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
})

const updateProfile = asyncHandler(async (req, res, next) => {
   try {

      // check the user is valid 
      const { _id } = req.user;

      if(!_id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.findById(_id);

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      const { studentName, studentEmail, studentPhone, studentBio, studentProfilePicture } = req.body;

      if(!studentName || !studentEmail || !studentPhone) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      student.studentName = studentName;
      student.studentEmail = studentEmail;
      student.studentPhone = studentPhone;
      student.studentBio = studentBio;


      await student.save({ validateBeforeSave: false });

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Student Profile Updated Successfully", student)
      );

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
})


export {
   fetchProfile,
   updateProfile
}