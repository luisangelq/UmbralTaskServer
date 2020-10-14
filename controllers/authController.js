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
        expiresIn: 3600 //1 hour
      },
      (error, token) => {
        if (error) throw error;

        //msg confirm
        res.json({ token: token });
        console.log("Todo correcto");
      }
    );

  } catch (error) {
      console.log(error);
  }
};
