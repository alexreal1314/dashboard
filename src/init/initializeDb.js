const mongoose = require('mongoose');
const { logger } = require('../utils');
const {
    mongoose: { options },
} = require('../config');
const promiseRetry = require('promise-retry');
const { omit } = require('lodash');
const { AlertModel } = require('../models/Alert');
const seedData = require('../../assets/data.json');

const promiseRetryOptions = {
    retries: 10,
    factor: 2,
    minTimeout: 0,
    maxTimeout: 5000,
};

module.exports = {
    initializeDb,
};

const connect = (hostname, name) => {
    return promiseRetry((retry, number) => {
        const url = 'mongodb://' + hostname + '/' + name;
        logger.info(`MongoClient connecting to ${url} - retry number: ${number}`);
        
        return mongoose
            .connect(url, {
                serverSelectionTimeoutMS: options.reconnectInterval,
                ...omit(options, ['reconnectInterval']),
            })
            .then(async (_db) => {
                logger.info(`Connected to DB: ${hostname}/${name}`);
                module.exports.db = _db;
            })
            .catch(retry);
    }, promiseRetryOptions);
};

function initializeDb ({ hostname, name }) {
    // connect to mongo db with config parameters.
    connect(hostname, name);

    mongoose.connection
        .once('open', async () => {
            await initCollections({ model: AlertModel, data: seedData });
        })
        .on('error', (error) => {
            logger.error(`Database connection failed: ${error.message}`);
        })
        .on('disconnected', () => {
            logger.info('Disconnected from DB');
        })
        .on('reconnected', () => {
            logger.info('Reconnected to DB');
        });

    mongoose.Promise = global.Promise;
}

async function initCollections ({ model, data }) {
    const count = await model.estimatedDocumentCount();
    if (!count) {
        await model.insertMany(data);
    }
}