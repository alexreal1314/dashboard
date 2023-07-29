const log4js = require('log4js');
const { logger } = require('../utils');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports.middleware = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/api', log4js.connectLogger(logger.infoLogger, {
        format: (req, res, format) => format(`:remote-addr  :method ${res.statusCode} :url`)
    }));

    app.use(cors());

    app.use((req, res, next) => {
        next();
    });
};