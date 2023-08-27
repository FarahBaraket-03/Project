const mongoose=require("mongoose");

const Offre=mongoose.model("Offre",{
    companyname:{
        type:String,
    },
    offre:{
        type:String,
    },
    price:{
        type:Number,
    },
    email:{
        type:String,
    },
    city:{
        type:String,
    },
    addresse:{
        type:String,
    }
});

module.exports=Offre;