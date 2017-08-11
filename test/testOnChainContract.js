// Set up
var fs = require('fs');
var funcOnChain = require("./functions/funcOnChainContract.js");
var Web3 = require('web3');
var web3 = new Web3();
if(!web3.currentProvider)
	web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// Get contract abi & bytecode
var abiOnChain = JSON.parse( fs.readFileSync('../compile/onChainContract.abi', 'utf-8') );
var binaryOnChain = fs.readFileSync('../compile/onChainContract.bytecode', 'utf-8');

// Contract constructor arguments

console.log("I still have " + web3.fromWei( web3.eth.getBalance(web3.eth.accounts[0]), "ether" ) + " ether");

var user = web3.eth.accounts[0];
var oracles = [web3.eth.accounts[1], web3.eth.accounts[2], web3.eth.accounts[3]];

web3.eth.contract(abiOnChain).new(oracles, web3.sha3("image"), web3.sha3("storage"), {from: web3.eth.accounts[0], data: binaryOnChain, gas: 4700000}, function(err, contractOnChain){
	if(err) console.log(err);
	else {
		if (typeof contractOnChain.address !== 'undefined') {
			console.log('contractOnChain mined! address: ' + contractOnChain.address + ' transactionHash: ' + contractOnChain.transactionHash);

			currentRound = contractOnChain.currentRound();
			console.log("current round: " + currentRound);

			funcOnChain.submitRequest(contractOnChain, user, "first request").then(function(){
				console.log("new request: " + contractOnChain.requests(currentRound))
				return funcOnChain.submitResult(contractOnChain, oracles[0], web3.sha3("result" + currentRound));
			}).then(function(){
				return funcOnChain.getResultBy(contractOnChain, currentRound, oracles[0]);
			}).then(function(_result){
				console.log("result submitted by " + oracles[0] + ": " + _result);
				return funcOnChain.submitResult(contractOnChain, oracles[1], web3.sha3("different result" + currentRound));
			}).then(function(){
				return funcOnChain.getResultBy(contractOnChain, currentRound, oracles[1]);
			}).then(function(_result){
				console.log("result submitted by " + oracles[1] + ": " + _result);
				return funcOnChain.submitResult(contractOnChain, oracles[2], web3.sha3("result" + currentRound));
			}).then(function(){
				return funcOnChain.getResultBy(contractOnChain, currentRound, oracles[2]);
			}).then(function(_result){
				console.log("result submitted by " + oracles[2] + ": " + _result);
				return funcOnChain.getResultCount(contractOnChain, currentRound, web3.sha3("result" + currentRound));
			}).then(function(_totalCount){
				console.log("total count of result " + web3.sha3("result" + currentRound) + ": " + _totalCount);
				console.log("final result of round " + currentRound + ": " + contractOnChain.finalResults(currentRound))
				console.log("--------------------------------------------");				
				currentRound = contractOnChain.currentRound();
				console.log("current round: " + currentRound);
				// return funcPoll.addQ(contractPoll, owner, 0, 3, "Q1: short answer", 0, []);
			}).catch(function(exception){
				console.log(exception);
			})
		}
	}
});

