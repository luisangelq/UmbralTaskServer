const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create projects
//api/projects
router.post(
  "/",
  auth,
  [check("name", "Name is required").notEmpty()],
  projectController.createProject
);

//get all projects
router.get("/", auth, projectController.getProjects);

//update project
router.put(
  "/:id",
  auth,
  [check("name", "Name is required").notEmpty()],
  projectController.updateProject
);

//Delete project
router.delete("/:id", 
    auth,
    projectController.deleteProject

);

module.exports = router;
