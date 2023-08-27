const router=require("express").Router()
const Offre = require("./modules/offre");


router.get("/", async (req, res) => {
    try {
      let allmessage = await Offre.find();
      res.send(allmessage);
      // console.log("get all users api");
      // res.send("get all users api")
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });

router.delete("/delete/:id", async (req, res) => {
    try {
      let pro_id = req.params.id;
      let result = await Offre.findOneAndDelete({ _id: pro_id });
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
      let offre = new Offre(data);
      let result = await offre.save(); // insertOne(user) , insertMany([{},{},{}])
      res.send(result);
      //     console.log("add new user api")
      // res.send("add new user api")
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  }); 

module.exports=router;