import Urls from '../models/urlsModel.js';
import {redisSet, extendTTL } from '../configs/redis.js';
import { getHashedValue } from '../helpers/URLhashing.js';

export const shorteningUrl = async (req,res)=>{
    
    try{    
   
        let existingUrl = await Urls.findOne({longURL:req.body.original_url});
    
   
        if (existingUrl) {
            return res.status(200).json({
                statusCode: 200,
                message: 'URL already exists',
                body: existingUrl
            });
        
     }else{
    if(req.body.custom_alias){
        
         let result = await Urls.create({
            longURL: req.body.original_url,
            shortURL: req.body.custom_alias,
            expiresAt: req.body.expiry_date
         })  
         
        await redisSet(req.body.custom_alias,req.body.original_url,"EX", 1800);


    }else{
        
        let hashedValue = getHashedValue(req.body.original_url);

        let result = await Urls.create({
            longURL: req.body.original_url,
            shortURL: hashedValue,
            expiresAt:req.body.expiry_date
        })

        res.status(201).json({
            statusCode: 201,
            message: `Successfully created short URL: ${hashedValue}`,
            hashedValue,
        });

        await redisSet(hashedValue,req.body.original_url,"EX", 1800);
         
    }
}
    }catch(error){
        console.error("Error in shorteningUrl:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
}


export const redirectUrl = async (req,res)=>{
    try{
    let getURL = await Urls.findOne({
        shortURL: req.params.url
    })
    if(getURL){
        res.redirect(301,getURL.longURL);

        await redisSet( req.params.url,getURL.longURL,'EX',1800);
    }else{
        return res.status(404).json({
            statusCode: 404,
            message: "No URL found for this ID",
        });
    }
}catch(error){
    console.error("Error in redirectUrl:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
}

}