pragma solidity ^0.4.10;
contract onChainContract {
    address public user;
    address[] public oracles;
    bytes32 public imageHash;
    bytes32 public storageHash;
    
    uint public currentRound;
    string[] public requests;
    mapping(uint => uint) public countInRound;
    struct result {
        uint count;
        mapping(address => bytes32) from;
        mapping(bytes32 => uint) candidateCount;
    }
    mapping(uint => result) public results;
    mapping(uint => bytes32) public finalResults;
    
    modifier onlyUser {
        if(msg.sender == user) _;
    }
    
    modifier onlyOracles {
        var isOracle = false;
        for(var i=0; i<oracles.length;i++ ) {
            if(msg.sender == oracles[i]) {
                isOracle = true;
                break;
            }
        }
        if(!isOracle)
            revert();
        _;
    }
    
    function onChainContract(address[] _oracles, bytes32 _imageHash, bytes32 _storageHash) {
        user = msg.sender;
        imageHash = _imageHash;
        for(var i=0;i<_oracles.length;i++){
            oracles.push(_oracles[i]);
        }
        storageHash = _storageHash;
    }
    
    function submitRequest(string _request) onlyUser {
        requests.push(_request);
    }
    function submitResult(bytes32 _result) onlyOracles {
        results[currentRound].from[msg.sender] = _result;
        results[currentRound].candidateCount[_result] ++;
        results[currentRound].count++;
        countInRound[currentRound]++;
        if(results[currentRound].count == oracles.length)
            deriveFinalResult();
    }
    function deriveFinalResult() {
        bytes32 finalResult;
        uint finalResultCount;
        for(var i=0; i<oracles.length;i++) {
            bytes32 tmp = results[currentRound].from[oracles[i]];
            if(results[currentRound].candidateCount[tmp] > finalResultCount) {
                finalResultCount = results[currentRound].candidateCount[tmp];
                finalResult = results[currentRound].from[oracles[i]];
            }
        }
        finalResults[currentRound] = finalResult;
        currentRound += 1;
    }
}
