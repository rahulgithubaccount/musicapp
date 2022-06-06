const mongoose = require("mongoose")


const SongSchema =  new mongoose.Schema({

user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"

},





  image:{
        type:String,
      
    }
  
  
})


const Song = mongoose.model("Song",SongSchema)


module.exports = Song 