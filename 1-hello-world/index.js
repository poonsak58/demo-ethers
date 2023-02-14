const { ethers } = require('ethers')

const run = async () => {

    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s3.binance.org:8545")

    const blockNumber = await provider.getBlockNumber()
    console.log('Lastest block number is:', blockNumber)


    // const wallet = ethers.Wallet.createRandom()

    // console.log(wallet.address)
    // console.log(wallet.mnemonic.phrase)
    // console.log(wallet.privateKey)

    
}

run()