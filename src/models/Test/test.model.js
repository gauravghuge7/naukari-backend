import { Schema, model } from 'mongoose';


const testSchema = new Schema({

   testName: {
      type: String,
      required: true,
   },

   testId: {
      type: String,
   },

   testDescription: {
      type: String,
   },
   

   testDate: {
      type: Date,
      default: Date.now
   },

   testTime: {
      type: Number,
      required: true,
   },

   topics: {
      type: String,

   },

   numberOfQuestions: {
      type: Number,
   },

   students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student'
   }],
   
   questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
   }]

}, {timestamps: true});


export const Test = model("Test", testSchema);