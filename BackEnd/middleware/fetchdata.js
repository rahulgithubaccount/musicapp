var jwt = require('jsonwebtoken');
const JWt_SECRET = "helloworld";


const fetchdata = async(req,res,next)=>{
const token = req.header("auth-token")

if(!token){
    res.status(401).send("user token not valid ")
}
const data = jwt.verify(token , JWt_SECRET)
req.user =  await  data.user
    next()
};




module.exports = fetchdata 



