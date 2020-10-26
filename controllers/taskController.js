const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
    //Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { belongsProject } = req.body;
    

      const projectTask = await Project.findById(belongsProject);
      if(!projectTask) {
        return res.status(404).json({ msg: "project not found" });
      }

      if (projectTask.creatorPerson.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not Authorized" });
      }
      
      const task = new Task(req.body);
      await task.save();
      res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

exports.getTask = async (req, res) => {
    try {
        const { belongsProject } = req.query;
          const projectTask = await Project.findById(belongsProject);
          if(!projectTask) {
            return res.status(404).json({ msg: "project not found" });
          }
    
          if (projectTask.creatorPerson.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized" });
          }
          
          //get task by project
          const tasks = await Task.find({ belongsProject });
          res.json({ tasks });
      } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
      }
}

exports.updateTask = async (req, res) => {
    try {
        const { belongsProject, name, state } = req.body;

        //If task exist
        let task = await Task.findById(req.params.id);
          if(!task) {
            return res.status(404).json({ msg: "Task not found" });
          }
    
          //extract project
          const projectTask = await Project.findById(belongsProject);

          if (projectTask.creatorPerson.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized" });
          }

          //update
          const newTask = {};
            newTask.name = name;
            newTask.state = state;
    

          //Save task
          task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true});
          res.json({ task });
          

      } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
      }
}

exports.deleteTask = async (req, res) => {
    try {
        const { belongsProject } = req.query;

        //If task exist
        let task = await Task.findById(req.params.id);
          if(!task) {
            return res.status(404).json({ msg: "Task not found" });
          }
    
          //extract project
          const projectTask = await Project.findById(belongsProject);

          if (projectTask.creatorPerson.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized" });
          }

          //Delete
          await Task.findOneAndRemove({ _id: req.params.id});
          res.json({ msg: "Task Deleted"})
          

      } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
      }
}