import { Test } from "../../models/Test/test.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const fetchAllTests = asyncHandler(async (req, res) => {

   try {

      const tests = await Test.find({});

      return res
         .status(200)
         .json(new ApiResponse(200, "All Tests Fetched Successfully", tests));
      
   } 
   catch (error) {
      console.log("error => ", error);
      throw new ApiError(400, error.message, error);
   }
   finally {
      console.log(" function execution complete");
   }
})


const fetchTestOverview = asyncHandler(async (req, res) => {
   try {

      const {id} = req.params;

      if (!id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const test = await Test.findById(id);
      if (!test) {
         throw new ApiError(400, "Test Not Found");
      }

      return res
         .status(200)
         .json(new ApiResponse(200, "Test Overview Fetched Successfully", test));
      
   } 
   catch (error) {
      console.log("error => ", error);
      throw new ApiError(400, error.message, error);
   }
   finally {
      console.log(" function execution complete");
   }
})


const enrollTest = asyncHandler(async (req, res) => {

   try {

      const {id} = req.params;

      if (!id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const test = await Test.findById(id);
      if (!test) {
         throw new ApiError(400, "Test Not Found");
      }

      test.students.push(req.user._id);
      await test.save();

      console.log("test => ", test);

      return res
         .status(200)
         .json(new ApiResponse(200, "Test Enrolled Successfully", test));
      
   } 
   catch (error) {
      console.log("error => ", error);
      throw new ApiError(400, error.message, error);
   }
   finally {
      console.log(" function execution complete");
   }
})

export {
   fetchAllTests,
   fetchTestOverview,
   enrollTest
}