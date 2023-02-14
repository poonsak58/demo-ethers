const { ethers } = require('ethers')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s3.binance.org:8545")

    const balance = await provider.getBalance("0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A")
    console.log(" My BNB Balance is:", ethers.utils.formatEther(balance))
    
}

run()