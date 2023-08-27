const router=require("express").Router()
const User = require("./modules/user");

router.get("/:email/:pass", async (req, res) => {
    try {
      curr_email = req.params.email;
      pwd = req.params.pass;
      currentUser = await User.findOne({ email:curr_email,password:pwd});
      if(currentUser) res.send(currentUser);
      else{
        know=await User.findOne({ email:curr_email});
        if(know){
          res.send("Your Password Is Wrong")
        }
        else{res.send("Can't Enter")}
      }
    } catch (error) {
      res.send(error);
    }
  });

router.put("/update/:id", async (req, res) => {
    try {
      let myId = req.params.id;
      let data = req.body ;
      let updatedUser = await User.findByIdAndUpdate({_id : myId} , data);
      res.send(updatedUser);
      // console.log("update user api ");
      // res.send("update user api");
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });


router.delete("/delete/:id", async (req, res) => {
    try {
      let user_id = req.params.id;
      let result = await User.findOneAndDelete({ _id: user_id });
      // find({}) findOne({age : 20}) , findOneAndX({}), find({age : 20}).count()
      // find({}).limit(15); , find({}).sort({});
  
      res.send(result);
      //     console.log("delete user api ")
      // res.send("delete user api")
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });

router.post("/add", async (req, res) => {
    try {
      let data = req.body;
      let user = new User(data);
      let result = await user.save(); // insertOne(user) , insertMany([{},{},{}])
      res.send(result);
      //     console.log("add new user api")
      // res.send("add new user api")
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  });

router.get("/", async (req, res) => {
    try {
      let allUsers = await User.find();
      res.send(allUsers);
      // console.log("get all users api");
      // res.send("get all users api")
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });

module.exports=router;
