//Routes for auth users
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//api/auth
router.post(
  "/",
  authController.authUser
);

//get userAuth
router.get(
  "/",
  auth,
  authController.authenticatedUser
);

module.exports = router;
