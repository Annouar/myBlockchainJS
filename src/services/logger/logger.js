const bunyan = require('bunyan');
const logConfig = require('../config').logConfig;

module.exports = bunyan.createLogger({
    name: logConfig.loggerName,
    streams: [
        {
            level: logConfig.displayedLogLevel,
            stream: process.stdout
        }
        /*{
            level: 'error',
            path: `/var/log/${logConfig.loggerName}.log`
        }*/
    ]
});
