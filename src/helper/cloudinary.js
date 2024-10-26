import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';
import dotenv from 'dotenv';


// Load environment variables
dotenv.config();



const uploadOnCloudinary = async (localFile) => {



   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   try {
      if (!localFile) return null;

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(localFile, {
         resource_type: "auto",
         path: "uploads",
      });

      if (!result) {
         throw new ApiError(500, "Upload failed");
      }

      // Remove file from local system
      fs.unlinkSync(localFile);

      const response = {
         public_id: result.public_id,
         secure_url: result.secure_url,
      };

      console.log(response);

      return response;

   } catch (error) {
      console.error(error);
      throw new ApiError(500, "Upload failed");
   }
};

export { uploadOnCloudinary };
