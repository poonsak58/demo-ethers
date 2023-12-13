const { ethers } = require('ethers')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
        // "https://rpc.j2o.io",
        "https://rpc.metachain.asia/",
    )
    // const abi = [
    //     'function safeMint(address to, string memory uri)'
    // ]
    // const TOKEN_Contract = new ethers.Contract("0xb8b6c624b6cef639cd2845b45ba2822e8579b2ea", abi, provider)


    try {

        let nonce = await provider.getTransactionCount("0x6e1433d411feb72C2f3F320175B74095a218018F");
        console.log("Nonce:", nonce);

        let feeData = await provider.getFeeData();
        console.log("Fee Data:", feeData);

        /*
        Legacy
            Fee Data: {
                lastBaseFeePerGas: null,
                maxFeePerGas: null,
                maxPriorityFeePerGas: null,
                gasPrice: BigNumber { _hex: '0x0ba43b7400', _isBigNumber: true }
            }

        Support EIP-1559
            Fee Data: {
                lastBaseFeePerGas: BigNumber { _hex: '0x08', _isBigNumber: true },
                maxFeePerGas: BigNumber { _hex: '0x59682f10', _isBigNumber: true },
                maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
                gasPrice: BigNumber { _hex: '0x04a817c800', _isBigNumber: true }
            }
        */

        /* Transaction gasPrice cannot send with both maxFeePerGas or maxPriorityFeePerGas */

        const tx = {
            type: 2, // type 0 legacy, type 2 eip-1559
            nonce: nonce,
            to: "0x8D97689C9818892B700e27F316cc3E41e17fBeb9", // Address to send to
            maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
            maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
            value: ethers.utils.parseEther("0.01"), // .01 ETH
            gasLimit: "21000", // basic transaction costs exactly 21000
            chainId: 42, // Ethereum network id
        };

        console.log("Transaction Data:", tx);
          
    } catch (e) {

        console.log(e)
        console.log(e.message)

    }

}

run()