const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://rahulkumar:rahul0007@cluster0.zhmmg.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,

    useUnifiedTopology: true
  }
).then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("not connected")
})










