//Routes for auth users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//api/auth
router.post(
  "/",
  [
    check("email", "Add a validate email").isEmail(),
    check("password", "password must be minimum of 8 characters").isLength({
      min: 8,
    }),
  ],
  authController.authUser
);

//get userAuth
router.get(
  "/",
  auth,
  authController.authenticatedUser
);

module.exports = router;
