const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, email, password, mobileNumber, role } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({email})
    if(user){
      return res.status(400).send("username or email already exists");
    }else{
      const newUser = new UserModel({
        username,
        email,
        password,
        mobileNumber,
        role
      });
      await newUser.save();
      return res.status(201).send({msg:"new user has been registered",newUser});
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ User:email, accessToken: token });
    } else {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

module.exports = { register, login };