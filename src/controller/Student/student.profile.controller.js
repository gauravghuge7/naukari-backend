import { uploadOnCloudinary } from "../../helper/cloudinary.js";
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

      const { studentName, studentEmail, studentPhone, studentBio } = req.body;

      
      console.log("req.file => ", req.file);
      console.log("req.files => ", req.files);



      let profilePicture = null;


      if(req.file) {
         
         const result = await uploadOnCloudinary(req.file.path);

         if(!result) {
            throw new ApiError(400, "Profile Picture Upload Failed");
         }

         profilePicture = result?.secure_url;


      }



      /** update the student profile */

      const update = await Student.findByIdAndUpdate(
         _id, 
         {
            $set: {
               ...(studentName && { studentName }),
               ...(studentEmail && { studentEmail }),
               ...(studentPhone && { studentPhone }),
               ...(studentBio && { studentBio }),
               ...(profilePicture && { studentProfilePicture: profilePicture }),
            },
         },
         {
            new: true,
         }
      );


      await student.save({ validateBeforeSave: false });

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Student Profile Updated Successfully", update)
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