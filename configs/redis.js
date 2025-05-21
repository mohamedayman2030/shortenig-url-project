import { Redis } from "ioredis";


const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT

});


export const redisConnect = async ()=>{
    redisClient.on("connect", () => console.log("Connected to Redis"));
    redisClient.on("ready", () => console.log("Redis is ready to use"));
}

export const redisSet = async (key,value,expirationMode,seconds)=>{
    try{
    await redisClient.set(key,value,expirationMode,seconds);
    }catch(error){
        console.error('failed to set the value',error.message);
    }
}

export const redisGet = async(key)=>{
    try{
         let value = await redisClient.get(key);

         return value;
    }catch(error){
             console.error('enable to find the value');
             return null;
    }
}


export const extendTTL = async(key, additionalSeconds)=>{

    const TTL = await redisClient.ttl(key);
    try{
    if(TTL>0){
        const newTTL = TTL+additionalSeconds;

        await redisClient.expire(key,newTTL);

        return true;
    }else{
        return false;
    }
}catch(error){
    console.error("can't update the ttl",error.message);
}
   
}