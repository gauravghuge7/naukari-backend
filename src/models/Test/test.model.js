import { Schema, model } from 'mongoose';


const testSchema = new Schema({

   testName: {
      type: String,
      required: true,
   },

   testId: {
      type: String,
      required: true,
   },

   testDate: {
      type: Date,
      required: true,
      default: Date.now
   },

   testTime: {
      type: Number,
      required: true,
   },

   topics: {
      type: String,
      required: true,
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