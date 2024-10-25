import mongoose from 'mongoose';

const connectDB = async () => {

   try {

      const connect = await mongoose.connect(process.env.MONGODB_URI);

      console.log(` MongoDB connection created Successfully ${connect.connection.host}`);
      
   } 
   catch (error) {
      console.log("Error while connecting the MONGODB",error)
      process.exit(1)   
   }

}


export {
   connectDB
}