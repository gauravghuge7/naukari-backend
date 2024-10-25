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
      required: true,
   },

   options: [{
      type: String,
      required: true,
   }],

   correctAnswer: {
      type: Boolean,
      required: true,
   }

}, {timestamps: true});


export const Question = model("Question", questionSchema);
