const CryptoJS = require('crypto-js');

class Block {
    /**
     * Constructor of the Block Class
     * @param {Number} id Index of the block in the blockchain
     * @param {Number} timestamp Block creation time
     * @param {String} previousBlockHash String representing prvious block unique hash
     * @param {Object} data Data to be send
     */
    constructor (id, timestamp, previousBlockHash, data) {
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.previousBlockHash = previousBlockHash.toString();
        this.hash = this.getBlockHash();
    }

    /**
     * Check if the Block attributes are in a correct type
     * @returns {Boolean} Block attributes are ok
     */
    isValidBlockStructure () {
        return typeof this.id === 'number'
            && typeof this.timestamp === 'number'
            && typeof this.data === 'string'
            && typeof this.previousBlockHash === 'string'
            && typeof this.hash === 'string';
    }

    /**
     * Generates the unique current Block hash
     * @returns {String} Hash represents the current block
     */
    getBlockHash () {
        return CryptoJS.SHA256(this.id + this.timestamp + this.data + this.previousBlockHash).toString();
    }
}

class Blockchain {
    /**
     * Initialize the blockchain (list of blocks) and generate the first block (Genesis)
     */
    constructor () {
        this.blockchain = [this.generateGenesis()];
    }

    /**
     * Genesis is the Blockchain first block. This block has index #0 and doesn't have previous hash
     * @returns {Block} Generated Genesis Block
     */
    generateGenesis () {
        return new Block(0, getCurrentTimestampMs(), '', 'Here is the blockchain genesis');
    }

    /**
     * Get the Blockchain last Block
     * @returns {Block} The Blockchain last Block
     */
    getLastBlock () {
        return this.blockchain[this.blockchain.length -1];
    }

    /**
     * Add a new block into the Blockchain
     * @param {String} data The data to insert into the new Block
     * @returns {Block} The block generated and added into Blockchain
     */
    generateNewBlock (data) {
        const previousBlock = this.getLastBlock();
        const newBlockId = previousBlock.id + 1;
        const newBlockPreviousBlockHash = previousBlock.hash;

        const newBlock = new Block(newBlockId, getCurrentTimestampMs(), newBlockPreviousBlockHash, data);
        this.blockchain.push(newBlock);

        return newBlock;
    }

    /**
     * Validate a Block using the previous Block (by checking ids, hash and previousHash)
     * @param {Block} block The Block to validate
     * @param {Block} previousBlock Previous Block
     * @returns {Booelean} Block is valid
     */
    static isValidBlock (block, previousBlock) { // maybe put it in block
        if (block.id !== previousBlock.id + 1) {
            return false;
        } 
        else if (block.previousBlockHash !== previousBlock.hash) {
            return false;
        }
        else if (block.hash !== block.getBlockHash()) {
            return false;
        }
        return true;
    }

    /**
     * Validate the integrity of all blocks (Blockchain) starting to validate Genesis Block
     * @param {Block[]} blockchainToValidate Chain of Block to validate
     * @returns {Boolean} Blockchain is valid
     */
    static isValidBlockchain (blockchainToValidate) {
        const isValidGenesis = () => {
            const genesisBlock = blockchainToValidate[0];
            if (genesisBlock.id !== 0) {
                return false;
            }
            else if (genesisBlock.previousBlockHash) {
                return false;
            }
            else if (genesisBlock.getBlockHash() !== genesisBlock.hash) {
                return false;
            }
            return true;
        };

        if (!isValidGenesis()) {
            return false;
        }

        for (let index = 1; index < blockchainToValidate.length; index++) {
            if (!Blockchain.isValidBlock(blockchainToValidate[index], blockchainToValidate[index - 1])) {
                return false;
            }
        }

        return true;
    }
}

/**
 * Get the current timestamp in ms (TODO: use moment.js an moment-tz to implement timezone)
 * @returns {Number} Current Timestamp in ms
 */
const getCurrentTimestampMs = () => {
    return Date.now();
}