// Write your "projects" router here!
const express = require("express");

const { validateProjectBody } = require("./projects-middleware");

const router = express.Router();

const Project = require("./projects-model.js");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Project.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(next);
});

router.post("/", validateProjectBody, (req, res, next) => {
  Project.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjectBody, (req, res, next) => {
  if (req.body.completed == null) {
    res.status(400).json({
      message: "Provide completed status for the project",
    });
  } else {
    Project.update(req.params.id, req.body)
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch(next);
  }
});

router.delete("/:id", (req, res, next) => {
  if (!req.params.id) {
    res.status(404);
  } else {
    Project.remove(req.params.id).then(() => {
      res.status(200);
    });
  }
  next();
});

router.get("/:id/actions", (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch(next);
});

module.exports = router;
