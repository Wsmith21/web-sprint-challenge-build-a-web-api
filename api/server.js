const express = require('express');
const server = express();

server.use(express.json());

// Configure your routes
const projectsRouter = require('/Users/walynsmith/web-sprint-challenge-build-a-web-api/api/projects/projects-router.js');
const actionsRouter = require('/Users/walynsmith/web-sprint-challenge-build-a-web-api/api/actions/actions-router.js');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


const PORT = process.env.PORT || 9005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
