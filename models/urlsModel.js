import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({path: './config.env'});


const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(conn=>{
    console.log('DB connection is successful');
})

const urlsSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: [true,'the url must have a short url type']
    },
    longURL:{
        type: String,
        required: [true,'the url must have a long url type']
    },
    expiresAt:{
        type: Date,
        expires: 0,
        required:[true,'url must have an expiry date']
    }
},{timestamps:true})

const Urls = mongoose.model('urls',urlsSchema);

export default Urls;