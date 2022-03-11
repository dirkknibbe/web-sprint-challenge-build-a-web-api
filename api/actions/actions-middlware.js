// add middlewares here related to actions

async function validateActionBody(req, res, next) {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res.status(400).json({
      message: "Provide notes and description and project_id for the action",
    });
  } else {
    next();
  }
}

module.exports = { validateActionBody };
