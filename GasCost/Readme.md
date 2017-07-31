* Basic operation
    * basic transaction: 21000 gas
    * SSTORE: 20000 gas
    * ecrecover: ~5000 gas
* On Chain Contract
    * deploy: ~1000000 gas
    * submit request: ~60000 gas
    * submit result: ~80000 gas
* SHA-512: ~200000 gas
* Elliptic Curve Computation
    * EC add: 30000 CPU cycles
    * EC mul: 940000 CPU cycles
        * ref: https://github.com/ethereum/py_ecc/tree/master/py_ecc/bn128
        * ref: https://github.com/ethereum/EIPs/pull/213
    * EC pairing(k points): 60000*k + 40000 gas
        * fixed, documented in yellow paper
        * ref: https://github.com/ethereum/py_pairing
