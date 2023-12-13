const { ethers } = require('ethers')
const ABI = require('./abi.json')
const { parseEther } = require('ethers/lib/utils')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.j2o.io")
    const Contract = new ethers.Contract("0x1B5f5eD24603A058A00ec9C2cBfAC3bE17902Edd", ABI, provider)
    // NFT Contract 0x26eC2bbC48B7Ac04FD1E6AF0d430E5ba33005981
    
    try {
        const trx = await Contract.callStatic.sell(
            "0x26eC2bbC48B7Ac04FD1E6AF0d430E5ba33005981", // NFT
            0, // NFT TOKEN ID
            "0x28c343d756525E6e4aA8107A7DDB243c4e2E5083", // Accept Token
            parseEther("10"), // Price
            1, // Amount
            1683611279, // Start Time
            1683614879, // End Time
            { from : "0x8F570A28E5061f3284949fb81Ab52c698cEAd367" }
        )


    } catch (e) {
        // console.log(e)
        // console.log(e.message)
        console.log(e.reason)
    }

}

run()