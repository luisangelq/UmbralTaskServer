const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  //Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Check registered user
    let user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ msg: "User doesn't exist"});
    }
    //check password
    const correctPass = await bcryptjs.compare(password, user.password);
    if(!correctPass) {
        return res.status(400).json({ msg: "Incorrect Password"})
    }

    //Create and sign JWT
    const payload = {
        user:{
            id: user.id,
            name: user.name
        }
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 7200 //2 hours
      },
      (error, token) => {
        if (error) throw error;

        //msg confirm
        res.json({ token: token });
        console.log("Everything is ok");
      }
    );

  } catch (error) {
      console.log(error);
  }
};

//get user is authenticate
exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({user})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "there was an error"});
  } 
}