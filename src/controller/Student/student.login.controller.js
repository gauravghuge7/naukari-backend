import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import {Student} from "../../models/Student/student.model.js"
import { generateOtp } from '../../helper/Student/otp.js';
import { StudentOtp } from '../../models/Student/student.otp.model.js';
import { sendOTPEmail } from '../../helper/Student/sendOtp.js';
import bcrypt  from 'bcrypt';



const generateAccessAndSecretToken = async (_id) => {

   try {

      const student = await Student.findById(_id);

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      const studentAccessToken = student.generateStudentAccessToken();
      const studentSecretToken = student.generateStudentSecretToken();

      student.studentRefreshToken = studentAccessToken;
      await student.save({ validateBeforeSave: false });

      return {
         studentAccessToken,
         studentSecretToken
      }

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

}

const options = {
   httpOny: true,
   secure: true
}


const sendOtp = asyncHandler(async (req, res, next) => {

   try {

      const { studentEmail } = req.body;

      if(!studentEmail) {
         throw new ApiError(400, "Please provide all the required fields");
      }


      const existedStudentCheck = await Student.findOne({ studentEmail });

      if(existedStudentCheck) {
         throw new ApiError(400, "Student already exists");
      }

      // generate the otp 
      const otp = await generateOtp();

      // send the otp using the nodemailer

      
      const confirmation = await sendOTPEmail(studentEmail, otp);

      if(!confirmation) {
         throw new ApiError(400, "Email Server Failed");
      }


      // create the entry in the otp collection 

      const otpEntry = await StudentOtp.create({
         studentEmail,
         studentOtp: otp,
      })


      if(!otpEntry) {
         throw new ApiError(400, "database server failed ")
      }

      

      return res 
      .status(200)
      .json(
         new ApiResponse(200, "OTP Sent Successfully", {})
      );

   }
   catch(e) {
      console.log("Error =>  ", e);
      throw new ApiError(400, e.message, e);
   }

})



const registerStudent = asyncHandler(async (req, res, next) => {

   try {

      // check if the otp is correct

      const { otp, studentEmail} = req.body;

      if(!otp) {
         throw new ApiError(400, "OTP is required");
      }

      const findOtp = await StudentOtp.findOne({
         studentEmail,
      })

      if(!findOtp) {
         throw new ApiError(400, "Otp Not Found");
      }

      if(findOtp.studentOtp !== otp) {
         throw new ApiError(400, "Invalid OTP Entered by you ");
      }

      findOtp.studentOtpVerified = true;

      await StudentOtp.findByIdAndDelete(findOtp._id);



      const { studentName, studentPassword, studentPhone } = req.body;

      if(!studentName || !studentEmail || !studentPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.create({
         studentName: studentName.trim(),
         studentEmail: studentEmail.trim(),
         studentPassword: studentPassword.trim(),
         studentPhone

      });


      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Student Registered Successfully", student)
      )

      
   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

})


const loginStudent = asyncHandler(async (req, res, next) => {

   try {

      const { studentEmail, studentPassword } = req.body;

      if(!studentEmail || !studentPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.findOne({ studentEmail });

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      const isPasswordCorrect = await bcrypt.compare(studentPassword, student.studentPassword);

      if(!isPasswordCorrect) {
         throw new ApiError(400, "Invalid Password");
      }

      const {studentAccessToken, studentSecretToken} = await generateAccessAndSecretToken(student._id);

      

      return res 
      .status(200)
      .cookie("studentAccessToken", studentAccessToken, options)
      .cookie("studentSecretToken", studentSecretToken, options)
      .json(
         new ApiResponse(200, "Student Login Successfully", student)
      )

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

})



export {
   registerStudent,
   sendOtp,
   loginStudent
}