const { ethers } = require('ethers')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s3.binance.org:8545")

    const privateKey = "0x4cdee88535d27a464616acd3ac7e6827bfe64f9a38dac0b9d63ef3018a0de724"; // addresss: 0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A
    const wallet = new ethers.Wallet(privateKey, provider)

    const balance = await provider.getBalance(wallet.address)
    console.log(" My BNB Balance is:", ethers.utils.formatEther(balance))

    const trx = await wallet.sendTransaction({
        to: "0x6e1433d411feb72C2f3F320175B74095a218018F",
        value: ethers.utils.parseEther('0.1')
    })

    console.log('Sending...\nTransaction hash: ', trx.hash)
    console.log('wating transaction to be confirmed...')

    await trx.wait()
    console.log('Transaction confirmed.')
    
}

run()