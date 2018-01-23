const CryptoJS = require('crypto-js');

class Block {
    constructor (id, hash, timestamp, previousBlockHash, data) {
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.previousBlockHash = previousBlockHash.toString();
        this.hash = this.getBlockHash();
    }

    getBlockHash () {
        return CryptoJS.SHA256(this.id + this.timestamp + this.data + this.preivousBlockHash).toString();
    }
}