const { ethers } = require('ethers')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s3.binance.org:8545")


    //BUSD : 0x63F897fED64ABc4A4676844B4c14AFE5E3b0dBe6

    //Wallet Address:  0x6e1433d411feb72C2f3F320175B74095a218018F

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
    }]

    const TOKEN_Contract = new ethers.Contract("0x63F897fED64ABc4A4676844B4c14AFE5E3b0dBe6", abi, provider)

    const TOKEN_balance = await TOKEN_Contract.balanceOf("0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A")
    const TOKEN_symbol = await TOKEN_Contract.symbol()

    console.log(ethers.utils.formatEther(TOKEN_balance), TOKEN_symbol)
    
}

run()