

const generateOtp = async () => {


   try {

      const otp = Math.floor(100000 + Math.random() * 900000)

      console.log("otp => ", otp);

      return otp;
      
   } 
   catch (error) {
      console.log(error)   
   }

}

export {
   generateOtp
}