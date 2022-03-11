// add middlewares here related to projects

async function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message:
        "Provide name and description and completed status for the project",
    });
  } else {
    next();
  }
}

module.exports = { validateProjectBody };
