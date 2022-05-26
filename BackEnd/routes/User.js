
const express = require("express")
const app = express()
const router = express.Router()
app.use(express.json());
const bcrypt = require('bcrypt')
require("./Db/connection") 
const User = require("./models/Schema")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');


const JWt_SECRET = "helloworld"

router.post("/postdata", [body('email').isEmail(),
body('password').isLength({ min: 5 }),], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fName, email, password, phone } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    let user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json("user all ready register")
    }

    user = new User({
        fName,
        email,
        password: passwordHash,
        phone
    })
    console.log(req.body)


    const data = {
        user: {
            id: user.id
        }
    }

    const jwtData = jwt.sign(data, JWt_SECRET)
    console.log(jwtData)
    res.json({ jwtData })

    user.save()

})

//user log in 
router.post("/", [body('email',"email id is not valid").isEmail(),
body('password',"password doesnot match ").exists()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    const user = await User.findOne({email});
    if(!user){
    res.status(400).json("user not found ")
    }

    const  passwordCompare = await bcrypt.compare(password,user.password)

    if(!passwordCompare)
{
    res.status(400).json("user not found ")
}
   

    console.log(req.body)


    const data = {
        user: {
            id: user.id
        }
    }

    const jwtData = jwt.sign(data, JWt_SECRET)
    console.log(jwtData)
    res.json({ jwtData })

})


module.exports = router