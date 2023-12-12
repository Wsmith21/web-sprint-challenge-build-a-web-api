// actions-middleware.js

// Example middleware function for action validation
const validateActionFields = (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      return res.status(400).json({ message: 'Project ID, description, and notes are required fields' });
    }
    next();
  };
  
  module.exports = { validateActionFields };
  