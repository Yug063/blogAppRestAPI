import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
const app = express();
// middlewares
app.use(express.json()); // always use this line no use of body parser if it is there 
// to send the data from frontend inform of json we use above line
app.use("/api/user",router);
// url : http://localhost:5000/api/user/
app.use("/api/blog",blogRouter);
mongoose
  .connect(
    "mongodb+srv://yugtyagi:Wlcm12345@restapi.z5eiakl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .then(() => {
    console.log("Connected to database and listening to port 5000");
  })
  .catch((err) => {
    console.log(err);
  });

// mongodb+srv://yugtyagi:<password>@restapi.z5eiakl.mongodb.net/?retryWrites=true&w=majority
/*
first we create models using mongoose
then we create routes using express and routes require controller
controller us defined using the models values
this defined routes are used in app/main file using middlewares
postman acts as a frontend for us
all work is done in user-controller
 */