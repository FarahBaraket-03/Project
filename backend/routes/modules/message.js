const mongoose=require("mongoose");

const Message=mongoose.model("Message",{
    name:{
        type:String,
    },
    message:{
        type:String,
    },
    rating:{
        type:Number,
    }
});

module.exports=Message;