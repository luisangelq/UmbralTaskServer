const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  //Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Project(req.body);

    //save project creator by JWT
    project.creatorPerson = req.user.id;

    //save project
    await project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//Get all projects from current user
exports.getProjects = async (req, res) => {
  try {
    let projects = await Project.find({ creatorPerson: req.user.id });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("there was an error");
  }
};

//Update a project
exports.updateProject = async (req, res) => {
  //Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  try {
    //extract project information
    const { name } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check Creator
    if (project.creatorPerson.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    //Update
    const newProject = {};
    if (name) {
      newProject.name = name;
    }

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//Delete project
exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    //Check Creator
    if (project.creatorPerson.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Project Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("there was an error");
  }
};
