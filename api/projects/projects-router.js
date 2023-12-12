const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProjectFields } = require('./projects-middleware');

// Endpoint to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get(); // Retrieve all projects
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});

// Endpoint to get a project by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.get(id); // Retrieve project by ID

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project' });
  }
});

// Endpoint to create a new project
router.post('/', validateProjectFields, async (req, res) => {
    const { name, description, completed } = req.body;
  
    try {
      // Modify the insert method to include the completed property explicitly
      const newProject = await Projects.insert({
        name,
        description,
        completed: completed || false, // Use the provided completed value or default to false
      });
  
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: 'Error creating project' });
    }
  });

// Endpoint to update a project by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body; // Assuming the request body contains the updated project fields
  
    // Check if the required fields are present in the request body for updating a project
    const { name, description, completed } = changes;
    if (!name || !description || completed === undefined) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }
  
    try {
      const updatedProject = await Projects.update(id, changes); // Update the project with the specified ID
  
      if (updatedProject) {
        res.status(200).json(updatedProject); // Return the updated project object
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating project' });
    }
  });

// Endpoint to delete a project by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Projects.remove(id);

    if (deletedProject === 0) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Endpoint to get actions for a project by ID
router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;

  try {
    const actions = await Projects.getProjectActions(id);

    if (!actions || actions.length === 0) {
      res.status(200).json([]); // Send an empty array if there are no actions for the project
    } else {
      res.status(200).json(actions);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching actions for the project' });
  }
});

module.exports = router;
