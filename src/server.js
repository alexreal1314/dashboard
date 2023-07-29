require('dotenv').config();
const express = require('express');
const { initializeDb } = require('./init');
const routes = require('./routes');
const { logger } = require('./utils');

const server = express();
const { config, mongoose: { hostname, name }, middleware } = require('./config');

// init middleware
middleware(server);

// init db
initializeDb({ hostname, name });

// init routes
routes(server);

const { port } = config;
server.listen(port, () => logger.info(`server started on port ${port}`));