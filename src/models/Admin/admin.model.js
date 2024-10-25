import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new Schema({

   adminName: {
      type: String,
      required: true,
   },

   adminEmail: {
      type: String,
      required: true,
      unique: true
   },

   adminPassword: {
      type: String,
      required: true
   },

   adminPasswordToken: {
      type: String,
   },

   adminAddress: {
      type: String,

   },

   adminRefreshToken: {
      type: String,
   }

}, {timestamps: true});




adminSchema.methods = {

   generateAdminAccessToken: function () {
      return jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
         },

         process.env.ADMIN_ACCESS_TOKEN,

         {
            expiresIn: "24h"
         }

      )
   },

   generateAdminSecretToken: function () {

      return jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
         },

         process.env.ADMIN_SECRET_TOKEN,

         {
            expiresIn: "24h"
         }
      )
   },

   isAdminPasswordCorrect: async function (adminPassword) {
      return await bcrypt.compare(adminPassword, this.adminPassword);
   }

}


/// create for saving encrypted password
adminSchema.pre("save", function (next) {

   if(this.isModified("adminPassword")){

      this.adminPasswordToken = jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
            adminPassword: this.adminPassword,
         },
         process.env.ADMIN_PASSWORD_TOKEN,
         {
            expiresIn: "1y"
         }
      )

      

      this.adminPassword = bcrypt.hashSync(this.adminPassword, 10);
   }
   next();
})


export const Admin = model("Admin", adminSchema);