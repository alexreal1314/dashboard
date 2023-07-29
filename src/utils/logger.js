const log4js = require('log4js');
log4js.configure({
    appenders: {
        console: { type: 'console', layout: { type: 'pattern', pattern: '%d{dd-MM-yyyy hh:mm:ss} %[%p%]: %m' } },
        errorLogFile: { type: 'file', filename: './serviceErrors.log', flags: 'a', layout: { type: 'pattern', pattern: '%d{dd-MM-yyyy hh:mm:ss} %m' } }
    },
    categories: {
        debug: { appenders: ['console'], level: 'debug' },
        info: { appenders: ['console'], level: 'info' },
        error: { appenders: ['console', 'errorLogFile'], level: 'error' },
        default: { appenders: ['console'], level: 'info' }
    }
});

const debugLogger = log4js.getLogger('debug');
const infoLogger = log4js.getLogger('info');
const errorLogger = log4js.getLogger('error');

const logger = {
    /**
     * Prints to console debug level logs.
     * @param {string} msg           String.
     * @param {Object} args JSON/Array/Error Object.
     */
    debug: (msg, args = null) => null === args ? debugLogger.debug(msg) : debugLogger.debug(msg, args),
    /**
     * Prints to console info level logs.
     * @param {string} msg           String.
     * @param {Object} args JSON/Array/Error Object.
     *
     */
    info: (msg, args = null) => null === args ? infoLogger.info(msg) : infoLogger.info(msg, args),
    /**
     * Prints to console and serviceExceptions.log error level logs.
     * @param {string} msg           String.
     * @param {Object} args JSON/Array/Error Object.
     */
    error: (msg, args = null) => null === args ? errorLogger.error(msg) : errorLogger.error(msg, args),

    infoLogger: infoLogger
};

module.exports = {
    logger
};