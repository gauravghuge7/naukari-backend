import multer from 'multer';


const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public');  /// ERROR : if your system in server not  public folder then you need to change the path
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   }
});

export const upload = multer({
   storage,
});