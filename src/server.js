const restify = require('restify');
const morganLogger = require('restify-logger');
const { log, serverConfig, logConfig } = require('./services');
const { blockRouter, blockchainRouter } = require('./api');

const server = restify.createServer({
    name: serverConfig.serverName,
    log
});

// Server middlewares
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(morganLogger(logConfig.morganLogLevel));

// Server routes
server.get('/api/health', (req, res, next) => {
    res.json({ status: 'ON' });
    next();
});

blockRouter.applyRoutes(server);
blockchainRouter.applyRoutes(server);

// Starts server
server.listen(serverConfig.port, () => {
    log.info(`Server '${serverConfig.serverName}' started on port ${serverConfig.port} in ${serverConfig.env} mode`);
});
