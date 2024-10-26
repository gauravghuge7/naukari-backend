import { Admin } from "../../models/Admin/admin.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../helper/cloudinary.js";



const fetchProfile = asyncHandler(async (req, res, next) => {
   try {

      const { _id } = req.user;

      if(!_id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const admin = await Admin.findById(_id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Admin Profile Fetched Successfully", admin)
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

      const admin = await Admin.findById(_id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const { adminName, adminEmail, adminPhone, adminBio, adminAddress } = req.body;

      

      /** update the admin profile */

      const update = await Admin.findByIdAndUpdate(
         _id, 
         {
            $set: {
               ...(adminName && { adminName }),
               ...(adminEmail && { adminEmail }),
               ...(adminPhone && { adminPhone }),
               ...(adminBio && { adminBio }),
               ...(adminAddress && { adminAddress }),
            
            },
         },
         {
            new: true,
         }
      );


      await admin.save({ validateBeforeSave: false });

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Admin Profile Updated Successfully", update)
      );

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
})

const uploadProfilePicture = asyncHandler(async (req, res, next) => {
   try {
      const { _id } = req.user;
      if(!_id) {
         throw new ApiError(400, "Please provide all the required fields");
      }
      const admin = await Admin.findById(_id);
      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }
   
      
      let profilePictureUrl = null;
      if(req.file) {
         const result = await uploadOnCloudinary(req.file.path);
         if(!result) {
            throw new ApiError(400, "Profile Picture Upload Failed");
         }
         profilePictureUrl = result?.secure_url;
      }
      const update = await Admin.findByIdAndUpdate(
         _id, 
         {
            $set: {
               ...(profilePictureUrl && { adminProfilePicture: profilePictureUrl }),
            },
         },
         {
            new: true,
         }
      );

      await update.save({ validateBeforeSave: false });

      console.log("admin => ", update);



      return res 
      .status(200)
      .json(
         new ApiResponse(200, "Admin Profile Updated Successfully", update)
      );
   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
})

export {
   fetchProfile,
   updateProfile,
   uploadProfilePicture
}  