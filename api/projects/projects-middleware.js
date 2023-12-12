// projects-middleware.js

// Example middleware function for project validation
const validateProjectFields = (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required fields' });
    }
    next();
  };
  
  module.exports = { validateProjectFields };
  