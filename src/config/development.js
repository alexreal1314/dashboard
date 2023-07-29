const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/..'));
const env = process.env.NODE_ENV || 'development';

const { logger } = require('../utils');
const config = {
    development: {
        root: rootPath,
        port: process.env.SERVER_PORT || '5000',
    },
};

logger.info(`Environment: ${env}`);
Object.keys(config[env]).forEach((key) => {
    logger.debug(`${key}: ${JSON.stringify(config[env][key])}`);
});

module.exports = {
    config: config[env],
};