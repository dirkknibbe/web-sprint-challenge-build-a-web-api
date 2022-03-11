// Write your "actions" router here!
const express = require("express");

const router = express.Router();

const { validateActionBody } = require("./actions-middlware");

const Action = require("./actions-model.js");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Action.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: "The action with the specified ID does not exist" });
      }
    })
    .catch(next);
});

router.post("/", validateActionBody, (req, res, next) => {
  Action.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateActionBody, (req, res, next) => {
  if (req.body.completed == null) {
    res.status(400).json({
      message: "Provide completed status for the action",
    });
  } else {
    Action.update(req.params.id, req.body)
      .then((updatedAction) => {
        res.status(200).json(updatedAction);
      })
      .catch(next);
  }
});

router.delete("/:id", (req, res, next) => {
  if (!req.params.id) {
    res.status(404);
  } else {
    Action.remove(req.params.id).then(() => {
      res.status(200);
    });
  }
  next();
});

module.exports = router;
