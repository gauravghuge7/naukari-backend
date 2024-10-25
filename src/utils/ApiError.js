
class ApiError extends Error {

   constructor(
      statusCode,
      message,
      error,
      data=[],
      stack=""
   
   ){
      super(message);
      this.statusCode = statusCode;
      this.error = error;
      this.data = data;
      

      if(stack) {
         this.stack = stack;
      }
      else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}

export {
   ApiError
}