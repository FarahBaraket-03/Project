const router=require("express").Router()
const Message = require("./modules/message");


router.get("/", async (req, res) => {
    try {
      let allmessage = await Message.find();
      res.send(allmessage);
      // console.log("get all users api");
      // res.send("get all users api")
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });

  router.post("/add", async (req, res) => {
    try {
      let data = req.body;
      let mess = new Message(data);
      let result = await mess.save(); // insertOne(user) , insertMany([{},{},{}])
      res.send(result);
      //     console.log("add new user api")
      // res.send("add new user api")
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  });

router.delete("/delete/:id", async (req, res) => {
    try {
      let pro_id = req.params.id;
      let result = await Message.findOneAndDelete({ _id: pro_id });
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


module.exports=router;