const express = require('express');
const server = express();

server.use(express.json());


const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');


server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


const PORT = process.env.PORT || 9005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
