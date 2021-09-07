const mongoose = require('mongoose');
const logger = require('../middleware/logger');
// todo[no hard code] this databse url should be dynamic in env

const options = {
	maxPoolSize: 50, 
        wtimeoutMS: 2500,
        useNewUrlParser: true
};


mongoose.connect(process.env.dbURL, options).catch(() => {
	logger.error('db: mongodb error ' + e);
	process.exit(1);
});

mongoose.connection.on('error', function (e) {
	logger.error('db: mongodb error ' + e);
	mongoose.connect(process.env.dbURL, options).catch(() => {
		process.exit(1);
	});
});

mongoose.connection.on('connected', function () {
	logger.info('Connected to database !: ' + process.env.dbURL);
});

mongoose.connection.on('disconnecting', function () {
	logger.info('database is disconnecting!!!');
});

mongoose.connection.on('disconnected', function () {
	logger.warn('database is disconnected!!!');
	mongoose.connect(process.env.dbURL, options).catch(() => {
		process.exit(1);
	});
});

mongoose.connection.on('reconnected', function () {
	logger.info('db: mongodb is reconnected: ' + process.env.dbURL);
});

mongoose.connection.on('timeout', function (e) {
	logger.warn('db: mongodb timeout ' + e);
});

mongoose.connection.on('close', function () {
	logger.warn('db: mongodb connection closed');
});

module.exports = mongoose;

