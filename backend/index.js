const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter=require("./routes/user");
const projectRouter=require("./routes/projects");
const messageRouter=require("./routes/message");
const offreRouter=require("./routes/offre");
require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

// * DB CONNECTION
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected succeffully");
});

app.use('/user',userRouter);
app.use('/project',projectRouter);
app.use('/message',messageRouter);
app.use('/offre',offreRouter);

app.listen(5000, () => {
    console.log("Server works on port 5000 ...");
  });