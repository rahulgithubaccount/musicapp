
const express = require("express")
const app = express()
var cors = require('cors')
app.use(express.json());
const bcrypt = require('bcrypt')
const port = process.env.port || 8000
require("./Db/connection")
const User = require("./models/Schema")
const Song= require("./models/SongsSchema")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchdata = require("./middleware/fetchdata");
app.use(cors())






const JWt_SECRET = "helloworld";

app.post("/postdata", [body('email').isEmail(),
body('password').isLength({ min: 5 }),],  async  (req, res) => {

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
  success = true
  const jwtData = jwt.sign(data, JWt_SECRET)
  console.log(jwtData)
  res.status(200).json({success, jwtData })



  user.save()






})


//user log in 
app.post("/login", [body('email', "email id is not valid").isEmail(),
body('password', "password doesnot match ").exists()] ,async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { email, password } = req.body

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json("user not found ")
  }



  const passwordCompare = await bcrypt.compare(password, user.password)

  let success = false
  if (!passwordCompare) {
    res.status(400).json("user not found ")
  }


  console.log(req.body)


  const data = {
    user: {
      id: user.id
    }
  }

  success = true
  const jwtData = jwt.sign(data, JWt_SECRET)
  console.log(jwtData)
  res.status(200).json({success, jwtData })

});





// get all notes 

app.get("/getallsong",fetchdata, async(req,res)=>{

  const songs =   await Song.find({user : req.user.id})
  res.status(200).json({songs})
  
})



// post notes
app.post("/postsong",fetchdata,(req,res)=>{
  const {songName,singerName}= req.body

  const song = new Song({
    songName,singerName, user:req.user.id
  })


  song.save()
  res.json(song)

})






app.listen(port, () => {
  console.log("server is running")
})







