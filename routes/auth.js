//Routes for auth users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController")

//api/auth
router.post(
  "/",
  [
    check("email", "Add a validate email").isEmail(),
    check("password", "password must be minimum of 6 characters").isLength({
      min: 6,
    }),
  ],
  authController.authUser
);

module.exports = router;
