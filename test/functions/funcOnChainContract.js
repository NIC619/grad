module.exports = {
    submitRequest: function(instance, _user, _request) {
        return new Promise(function(resolve, reject){
            instance.submitRequest(_request, {from: _user, gas: 4700000},
                function(err, tx_id){
                    if (err) {
                        console.log("in submitRequest: " + err);
                        reject(err);
                    } else {
                        console.log("submitRequest tx id: " + tx_id);
                        resolve();
                    }
                }
            );
        });
        
    },
    submitResult: function(instance, _oracle, _result) {
        return new Promise(function(resolve, reject){
            instance.submitResult(_result, {from: _oracle, gas: 4700000},
                function(err, tx_id){
                    if (err) {
                        console.log("in submitResult: " + err);
                        reject(err);
                    } else {
                        console.log("submitResult tx id: " + tx_id);
                        resolve();
                    }
                }
            );
        });
        
    },
    getResultTotalCount: function(instance, _round) {
        return new Promise(function(resolve, reject){
            instance.getResultTotalCount(_round, function(err, count){
                if (err) {
                    console.log("in getResultTotalCount: " + err);
                    reject(err);
                } else {
                    console.log("Total count: " + count.toString());
                    resolve(count);
                }
            });
        });
    },
    getResultBy: function(instance, _round, _oracle) {
        return new Promise(function(resolve, reject){
            instance.getResultBy(_round, _oracle, function(err, result){
                if (err) {
                    console.log("in getResultBy: " + err);
                    reject(err);
                } else {
                    console.log("Result: " + result.toString());
                    resolve(result);
                }
            });
        });
    },
    getResultCount: function(instance, _round, _result) {
        return new Promise(function(resolve, reject){
            instance.getResultCount(_round, _result, function(err, count){
                if (err) {
                    console.log("in getResultCount: " + err);
                    reject(err);
                } else {
                    console.log("Result count: " + count.toString());
                    resolve(count);
                }
            });
        });
    }
}