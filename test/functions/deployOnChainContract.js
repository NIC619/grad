module.exports = {
    deploy: function(abi, bytecode, oracles, imageHash, storageHash, user, cb) {
        web3.eth.contract(abiOnChain).new(oracles, imageHash, storageHash, {from: user, gas: 4700000}, function(err, instance) {
            if(err) {
                console.log(err);
                throw "error deploying contract";
            }
            else {
                console.log("contract deployed at " + instance.address)
                cb(instance.address);
            }
        });
    }
}