const express = require('express');
const server = express();

server.use(express.json()); // Use JSON parser middleware
// Other middleware configurations...

// Configure your routes
const projectsRouter = require('./api/projects/projects-router');
const actionsRouter = require('./api/actions/actions-router');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


const PORT = process.env.PORT || 9001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
