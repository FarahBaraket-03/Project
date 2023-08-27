const router=require("express").Router()
const Project = require("./modules/project");

router.get("/", async (req, res) => {
    try {
      let allProjects = await Project.find();
      res.send(allProjects);
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
      let project = new Project(data);
      let result = await project.save(); // insertOne(user) , insertMany([{},{},{}])
      res.send(result);
      //     console.log("add new user api")
      // res.send("add new user api")
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  });

  router.put("/update/:id", async (req, res) => {
    try {
      let myId = req.params.id;
      let data = req.body ;
      let updatedProject = await Project.findByIdAndUpdate({_id : myId} , data);
      res.send(updatedProject);
      // console.log("update user api ");
      // res.send("update user api");
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });


router.delete("/delete/:id", async (req, res) => {
    try {
      let pro_id = req.params.id;
      let result = await Project.findOneAndDelete({ _id: pro_id });
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