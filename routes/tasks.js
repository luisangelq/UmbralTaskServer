const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/tasks
router.post(
  "/",
  auth,
  [
    check("name", "Name is required").notEmpty(),
    check("belongsProject", "Project is required").notEmpty(),
  ],
  taskController.createTask
);

//get task by project
router.get(
    "/",
    auth,
    taskController.getTask
  );

//Update task
router.put(
    "/:id",
    auth,
    taskController.updateTask
  );

//Delete task
router.delete(
    "/:id",
    auth,
    taskController.deleteTask
  );

module.exports = router;
