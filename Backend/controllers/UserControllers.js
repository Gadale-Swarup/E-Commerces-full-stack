const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// async function register(req, res) {
//   const { username, email, password, mobileNumber, role } = req.body;
//   console.log(req.body);
//   try {
//     const user = await UserModel.findOne({email})
//     if(user){
//       return res.status(400).send("username or email already exists");
//     }else{
//       const newUser = new UserModel({
//         username,
//         email,
//         password,
//         mobileNumber,
//         role
//       });
//       await newUser.save();
//       return res.status(201).send({msg:"new user has been registered",success: true});
//     }
//   } catch (error) {
//     res.status(400).send({msg:error.message,success: false});
  
//   }
// }
async function register(req, res) {
  console.log(req.body);
  const { username, email, password, mobileNumber, role } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      const newUser = new UserModel({
        username,
        email,
        password,
        mobileNumber,
        role,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", success: true });
    } else {
      res.status(400).json({ error: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ User:email, 'token': token , success: true });
    } else {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
  } catch (error) {
    res.status(500).send({error: error.message,success: false});
    console.log(error);
  }
}

module.exports = { register, login };