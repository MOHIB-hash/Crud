const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud");

app.get("/", (req, resp) => {
  UserModel.find({})
    .then((users) => resp.json(users))
    .catch((err) => resp.json(err));
});

app.get("/getUser/:id", (req, resp) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => resp.json(users))
    .catch((err) => resp.json(err));
});

app.put("/updateUser/:id", (req, resp) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => resp.json(users))
    .catch((err) => resp.json(err));
});

app.delete("/deleteUser/:id", (req, resp) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((result) => resp.json(result))
    .catch((err) => resp.json(err));
});

app.post("/createUser", (req, resp) => {
  UserModel.create(req.body)
    .then((users) => resp.json(users))
    .catch((err) => resp.json(err));
});

app.listen(3001, () => {
  console.log("server is runnning");
});
