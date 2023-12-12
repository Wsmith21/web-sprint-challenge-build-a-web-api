const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');
const { validateActionFields } = require('./actions-middlware');

// Endpoint to get all actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get(); // Retrieve all actions
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// Endpoint to get an action by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const action = await Actions.get(id); // Retrieve action by ID

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving action' });
  }
});

// Endpoint to create a new action
router.post('/', validateActionFields, async (req, res) => {
    const { project_id, description, notes } = req.body;
  
    try {
      // Check if the project with the specified project_id exists
      const projectExists = await Actions.get(project_id);
  
      if (!projectExists) {
        return res.status(400).json({ message: 'Project does not exist' });
      }
  
      // Create a new action
      console.log('Before inserting action into the database. Data:', { project_id, description, notes });
      const newAction = await Actions.insert({ project_id, description, notes });
      console.log('After inserting action. New Action:', newAction);
  
      if (newAction) {
        return res.status(201).json(newAction); // Return the newly created action
      } else {
        return res.status(500).json({ message: 'Error creating action' });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: 'Error creating action' });
    }
  });
  
  


  

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAction = await Actions.remove(id);

    if (deletedAction === 0) {
      res.status(404).json({ message: 'Action not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting action' });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body; // Assuming the request body contains the updated action fields
  
    // Check if the required fields are present in the request body
    const { notes, description, completed, project_id } = changes;
    if (!notes || !description || completed === undefined || !project_id) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }
  
    try {
      const updatedAction = await Actions.update(id, changes); // Update the action with the specified ID
  
      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating action' });
    }
  });

module.exports = router;
