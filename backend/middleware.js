const jwt = require("jsonwebtoken");

function middleware(req,res,next){
  
    if(!req.cookies.token){
        return res.json({message:"No token Found"})
    }else{
        const token = req.cookies.token;
        try{
            const ans = jwt.verify(token,process.env.jwt_secret);

            if(ans){
                req.body.userid = ans;
                next();
            }
        }
        catch(error){
           return   res.status(401).json({success:false,message:"Unauthorized acceess"});
        }
        
    }
}


module.exports={
    middleware
}