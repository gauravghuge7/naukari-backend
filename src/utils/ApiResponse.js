class ApiResponse {

   constructor(
      statusCode,
      message,
      data,
      anything
   ) {

      this.statusCode = statusCode;
      this.data = data;
      this.anything = anything;
      this.success = true;
      this.message = message;
      this.error = null;
   }

}

export {
   ApiResponse
}