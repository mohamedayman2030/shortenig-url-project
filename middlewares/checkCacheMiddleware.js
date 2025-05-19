import {redisGet, redisSet, extendTTL} from "../configs/redis.js";



const checkCachedUrls = async (req,res,next)=>{
   try{
            let value = await redisGet(req.params.url);
            if(value){
                res.redirect(301,value);

                await extendTTL(req.params.url,1800);

                return;
            }else{
                next();
            }
   }catch(error){
    console.log('unable to reach redis');
    next();
   }
}

export default checkCachedUrls;