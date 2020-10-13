const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }

    //create new user
    user = new User(req.body);

    //Hasher password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save()

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
      }
    );

  } catch (error) {
    console.log(error);
    res.status(400).send("there was an error");
  }
};
