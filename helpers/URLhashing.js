import  crypto from 'crypto';


export const getHashedValue = (url)=>{
    let hashedValue = crypto.createHash('sha256').update(url).digest('base64url');

    return hashedValue.slice(0,8);
}