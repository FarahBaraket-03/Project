const mongoose=require("mongoose");

const Project=mongoose.model("Project",{
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    url:{
        type:String,
    },
    image:{
        type:String,
    }
});

module.exports=Project;