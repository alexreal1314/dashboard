const { config } = require('./development');
const { mongoose } = require('./mongoose');
const { middleware } = require('./middleware');

module.exports = {
    config,
    mongoose,
    middleware,
};