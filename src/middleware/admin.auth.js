import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";


const isAdminLogin = async (req, res, next) => {
   try {
      
      const adminAccessToken = req.cookies.adminAccessToken;
   
      if(!adminAccessToken) {
         throw new ApiError(404, "admin access token not found");
      }

      const decoded = await jwt.verify(adminAccessToken, process.env.ADMIN_ACCESS_TOKEN);

      req.user = decoded;

      next();
   
      
   } 
   catch (error) {
      throw new ApiError(505, error?.message);   
   }
}

export {
   isAdminLogin   
}