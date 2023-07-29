module.exports.mongoose = {
    hostname: process.env.DB_HOSTNAME,
    name: process.env.DB_NAME,
    debug: 'true' === process.env.MONGO_DEBUG,
    options: {
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectInterval: 30000,
        autoIndex: false,
    },
};