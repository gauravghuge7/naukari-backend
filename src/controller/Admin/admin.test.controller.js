import {ApiError} from "../../utils/ApiError.js";
import {ApiResponse} from "../../utils/ApiResponse.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import {Admin} from "../../models/Admin/admin.model.js";
import { Question } from "../../models/Test/questions.model.js";
import { Test } from "../../models/Test/test.model.js";
import mongoose from "mongoose";


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

      const test = await Test.find({});
      return res
         .status(200)
         .json(new ApiResponse(200, "Admin Test Fetched Successfully", test));
   } catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
});


const fetchCurrentTest = asyncHandler(async (req, res, next) => {
   try {

      const {id} = req.params;
      if (!id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const test = await Test.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(id)
            }
         },
         {
            $lookup: {
               from: "questions",
               localField: "_id",
               foreignField: "test",
               as: "questions"
            }
         },
         {
            $project: {
               _id: 1,
               testName: 1,
               testDescription: 1,
               numberOfQuestions: 1,
               questions: 1
            }
         },

      ])



      if (!test) {
         throw new ApiError(400, "Test Not Found");
      }

      return res
         .status(200)
         .json(new ApiResponse(200, "Test Fetched Successfully", test));
      
   } 
   catch (error) {
      console.log(error);
      throw new ApiError(400, error.message, error);
   }
})


const createTest = asyncHandler(async (req, res, next) => {

   try {
      
      console.log("excution start ");
      const admin = await Admin.findById(req?.user?._id);

      if (!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      // NOTE: receive the questions in the body 

      const {testName, testTime, testDescription, numberOfQuestions, marks} = req.body;

      if(!testName || !testTime || !testDescription || !numberOfQuestions) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const createTest = await Test.create({
         testName,
         testTime,
         testDescription,
         numberOfQuestions,  
         marks
      })

      return res
         .status(200)
         .json(new ApiResponse(200, "Admin Test Created Successfully", createTest));
   } 
   catch (error) {
      console.log(error);
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
      console.log("excution start ", req.body);

      const {id} = req.params;
      const { question} = req.body;

      if(!id || !question) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const createQuestion = await Question.create({
         test: id,
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


const completeTest = asyncHandler(async (req, res) => {

   try {

      const {id} = req.params;

      if (!id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const test = await Test.findById(id);
      if (!test) {
         throw new ApiError(400, "Test Not Found");
      }

      test.isCompleted = true;
      await test.save();

      return res
         .status(200)
         .json(new ApiResponse(200, "Test Creation  Completed Successfully", test));

   } 
   catch (error) {
      console.log(error);
      throw new ApiError(400, error.message, error);
   }
   finally {
      console.log(" function execution complete");
   }
})


const deleteTest = asyncHandler(async (req, res) => {
   try {

      const {id} = req.params;

      if (!id) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const test = await Test.findByIdAndDelete(id);
      if (!test) {
         throw new ApiError(400, "Test Not Found");
      }

      

      return res
         .status(200)
         .json(new ApiResponse(200, "Test Deleted Successfully", test));

   }
   catch (error) {
      console.log(error);
      throw new ApiError(400, error.message, error);
   }
   finally {
      console.log(" function execution complete");
   }
})


export {
   fetchTest,
   fetchCurrentTest,
   createTest,
   addQuestionsInTest,
   completeTest,
   deleteTest
};