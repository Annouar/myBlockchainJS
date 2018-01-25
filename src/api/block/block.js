const CryptoJS = require('crypto-js');

class Block {
    /**
     * Constructor of the Block Class
     * @param {Number} id Index of the block in the blockchain
     * @param {Number} timestamp Block creation time
     * @param {String} previousBlockHash String representing prvious block unique hash
     * @param {Object} data Data to be send
     */
    constructor(id, timestamp, previousBlockHash, data) {
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
    isValidBlockStructure() {
        return (
            typeof this.id === 'number' &&
            typeof this.timestamp === 'number' &&
            typeof this.data === 'string' &&
            typeof this.previousBlockHash === 'string' &&
            typeof this.hash === 'string'
        );
    }

    /**
     * Generates the unique current Block hash
     * @returns {String} Hash represents the current block
     */
    getBlockHash() {
        return CryptoJS.SHA256(this.id + this.timestamp + this.data + this.previousBlockHash).toString();
    }
}

module.exports = Block;
