const express = require('express');
const server = express();


server.use(express.json()); // Use JSON parser middleware
// Other middleware configurations...

// Configure your routes
const projectsRouter = require('./projects-router');
const actionsRouter = require('./actions-router');

server.use('./projects-router', projectsRouter);
server.use('./actions-router', actionsRouter);


const PORT = process.env.PORT || 9001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
