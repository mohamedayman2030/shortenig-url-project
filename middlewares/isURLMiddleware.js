import validator from 'validator';

let options = {
    protocols: ['http','https'],
    require_protocol: true,
    require_host:true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
}


const IsValidURL = (req, res, next)=>{
    if(!req.body.original_url|| !validator.isURL(req.body.original_url,options)){
        return res.status(400).json({ message: "Invalid URL provided." });
    }else{
        next();
    }
}

export default IsValidURL;