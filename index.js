import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import  urlsRouter from './routes/urlsRouter.js';
import {redisConnect} from './configs/redis.js';

dotenv.config({path: './config.env'});





const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


app.use('/',urlsRouter);

redisConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('app is listening');
})



