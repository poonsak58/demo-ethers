const { ethers } = require('ethers')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s3.binance.org:8545")

    const abi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },]

    const privateKey = "0x4cdee88535d27a464616acd3ac7e6827bfe64f9a38dac0b9d63ef3018a0de724"; // addresss: 0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A
    const wallet = new ethers.Wallet(privateKey, provider)

    const TOKEN_Contract = new ethers.Contract("0x63F897fED64ABc4A4676844B4c14AFE5E3b0dBe6", abi, wallet)

    const trx = await TOKEN_Contract.transfer("0x6e1433d411feb72C2f3F320175B74095a218018F", ethers.utils.parseEther("50"))
    console.log('Sending...\nTransaction hash: ', trx.hash)
    console.log('wating transaction to be confirmed...')

    await trx.wait()
    console.log('Transaction confirmed.')


    const TOKEN_balance = await TOKEN_Contract.balanceOf("0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A")
    const TOKEN_symbol = await TOKEN_Contract.symbol()

    console.log(ethers.utils.formatEther(TOKEN_balance), TOKEN_symbol)
    
}

run()