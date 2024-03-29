const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../solution/config");

function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
    const words =  token.split(" ");
    const jwtToken = words[1];
    const decodedvalue = jwt.verify(jwtToken,JWT_SECRET);
    if(decodedvalue.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"not authorised"  
        })
    }
}

module.exports = adminMiddleware;
