import mongoose, { Schema, model } from "mongoose";

const studentOtpSchema = new Schema(
   {

      studentEmail: {
         type: String,
         required: true,

      },

      studentOtp: {
         type: String,
         required: true,
      },

      studentOtpExpires: {
         type: Date,
         
      },

      studentOtpVerified: {
         type: Boolean,
         
      }

   },
   {
      timestamps: true,
      expires: "1h"
   }
);

export const StudentOtp = model("StudentOtp", studentOtpSchema);

