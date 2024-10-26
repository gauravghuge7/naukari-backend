import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectRouter from './router/router.connect.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
   origin: '*',
   credentials: true
}));




app.use("/api", connectRouter);




app.get('/', (req, res) => {
   res.send('Server is running on port 3000');
});


export default app;