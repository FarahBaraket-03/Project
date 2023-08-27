const mongoose=require("mongoose");

const User=mongoose.model("User",{
    fullname:{
        type:String,
    },
    description:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    }
});

module.exports=User;