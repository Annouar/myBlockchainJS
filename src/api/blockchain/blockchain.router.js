const Router = require('restify-router').Router;
const errs = require('restify-errors');
const log = require('../../services').log;
const myBlockchain = require('./blockhain').myBlockchain;

const blockchainRouter = new Router();

blockchainRouter.get('/api/blockchain', (req, res, next) => {
    log.debug(JSON.stringify(myBlockchain.blockchain, null, 4));
    res.send(myBlockchain.getBlockchain());
    return next();
});

blockchainRouter.post('/api/blockchain/blocks', (req, res, next) => {
    const data = req.body.data || '';
    log.info(`Trying to create new block with data '${data}'`);

    if (!data) {
        log.error('Body parameter \'data\' is missing !');
        return next(new errs.MissingParameterError('Body parameter \'data\' is missing !'));
    }
    if (typeof data !== 'string') {
        log.error(`Invalid parameter. '${data}' found. Data must be string`)
        return next(new errs.InvalidArgumentError(`'data' parameter is invalid. '${data}' found. Data must be string`));
    }
    
    const blockCreated = myBlockchain.generateNewBlock(data);
    log.info(`The block #${blockCreated.id} has been suscessfully created !`);
    log.debug(JSON.stringify(blockCreated, null, 4));

    res.status(201);
    res.send(blockCreated);
    return next();
})

module.exports = blockchainRouter;