import { Schema, model } from 'mongoose';

const questionSchema = new Schema({

   test: [{
      type: Schema.Types.ObjectId,
      ref: 'Test'
   }],

   question: {
      type: String,
      required: true,
   },
   
   answer: {
      type: String,

   },

   options: [{
      type: String,

   }],

   correctAnswer: {
      type: Boolean,

   }

}, {timestamps: true});


export const Question = model("Question", questionSchema);
