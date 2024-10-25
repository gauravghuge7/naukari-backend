
import { Admin } from './../../models/admin.model.js';
import { Test } from './../../models/test.model.js';
import {ApiResponse} from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import { asyncHandler } from '../../utils/asyncHandler.js';


const createTest = asyncHandler(async (req, res, next) => {


   
   try {

      const { testName, testId, topics } = req.body;

      if(!testName || !testId || !topics) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const admin = await Admin.findById(req.user._id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const existingTest = await Test.findOne({ testId });

      if(existingTest) {
         throw new ApiError(400, "Test Already Exists");
      }

      // for extra security give trim fields for all entries 
      const test = await Test.create({
         testName: testName.trim(),
         testId: testId.trim(),
         topics: topics.trim(),
         students: [],
         questions: []
      });

      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Test Created Successfully", test)
      )

   } 

   catch (error) {
      console.log("Error => ",error.message);
      throw new ApiError(400, error.message, error);
   }
})


const createAQuestion = asyncHandler(async (req, res, next) => {

   
   try {

      const { question, answer, correctAnswer, testId } = req.body;

      if(!question || !answer || !correctAnswer || !testId) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const admin = await Admin.findById(req.user._id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const existingTest = await Test.findOne({ testId });

      if(!existingTest) {
         throw new ApiError(400, "Test Not Found");
      }

      const existingQuestion = await Test.findOne({ question });

      if(existingQuestion) {
         throw new ApiError(400, "Question Already Exists");
      }

      // for extra security give trim fields for all entries 
      const createQuestion = await Question.create({
         question: question.trim(),
         answer: answer.trim(),
         correctAnswer: correctAnswer.trim(),
         test: existingTest._id
      });

      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Question Created Successfully", createQuestion)
      )

   } 
   catch (error) {
      console.log("Error => ",error.message);
      throw new ApiError(400, error.message, error);
   }

})



const addQuestionsToTest = asyncHandler(async (req, res, next) => {
   
   try {

      const { testId, questions } = req.body;

      if(!testId || !questions) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const admin = await Admin.findById(req.user._id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const existingTest = await Test.findOne({ testId });

      if(!existingTest) {
         throw new ApiError(400, "Test Not Found");
      }

      
      // save the questions to the tests
      existingTest.questions.push(questions);

      // save the test after inserting the questions
      await existingTest.save({ validateBeforeSave: false });

      

      

      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Questions Added Successfully", addQuestions)
      )  
      
      
   } 
   catch (error) {
      console.log("Error => ",error.message);
      throw new ApiError(400, error.message, error);
   }

})




export {
   createTest
}