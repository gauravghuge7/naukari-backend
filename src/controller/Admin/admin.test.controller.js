import {ApiError} from "../../utils/ApiError.js";
import {ApiResponse} from "../../utils/ApiResponse.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import {Admin} from "../../models/Admin/admin.model.js";
import { Question } from "../../models/Test/questions.model.js";
import { Test } from "../../models/Test/test.model.js";


const fetchTest = asyncHandler(async (req, res, next) => {
   try {
      const {_id} = req.user;
      if (!_id) {
         throw new ApiError(400, "Please provide all the required fields");
      }
      const admin = await Admin.findById(_id);
      if (!admin) {
         throw new ApiError(400, "Admin Not Found");
      }
      return res
         .status(200)
         .json(new ApiResponse(200, "Admin Test Fetched Successfully", admin));
   } catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
});


const createTest = asyncHandler(async (req, res, next) => {

   try {
      
      const admin = await Admin.findById(req?.user?._id);

      if (!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      // NOTE: receive the questions in the body 

      const {testName, testTime, testDescription, topics} = req.body;

      if(!testName || !testTime || !testDescription || !topics) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const createTest = await Test.create({
         testName,
         testTime,
         testDescription,
         questions,  
      })

      return res
         .status(200)
         .json(new ApiResponse(200, "Admin Test Created Successfully", createTest));
   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
});

const addQuestionsInTest = asyncHandler(async (req, res, next) => {
   try {
      const admin = await Admin.findById(req?.user?._id);

      if (!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      // NOTE: receive the questions in the body 

      const {testId, question} = req.body;

      if(!testId || !question) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const createQuestion = await Question.create({
         test: testId,
         question,
      })


      return res
         .status(200)
         .json(new ApiResponse(200, "Admin Test Created Successfully", createQuestion));

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
});


export {
   fetchTest,
   createTest,
   addQuestionsInTest

};