const mongoose = require("mongoose")


const SongSchema =  new mongoose.Schema({

user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"

},


singerName:{
        type:String,
        required:true
    },
 

    songName:{
        type:String,
        required:true,
        
    },
  
  
})


const Song = mongoose.model("Song",SongSchema)


module.exports = Song 