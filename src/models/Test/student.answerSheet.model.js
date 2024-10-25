
import { Schema, model } from 'mongoose';

const answerSheetSchema = new Schema({

   studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
   },

   testId: {
      type: Schema.Types.ObjectId,
      ref: 'Test'
   },

   answerSheet : [{

      questionId: {
         type: Schema.Types.ObjectId,
         ref: 'Question'
      },
      
      answer: {
         type: String,
         required: true,
      },
   }]


}, { timestamps: true });


export const AnswerSheet = model("AnswerSheet", answerSheetSchema);