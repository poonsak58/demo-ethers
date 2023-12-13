const { ethers, utils } = require('ethers')
const abi = require('./abi.json')

const run = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s2.bnbchain.org:8545"
    )
    const iface = new utils.Interface(["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"])

    try {
        const tx = await provider.getTransactionReceipt("0x156cb03eb99e8eee3fbf9c192abb6b6819ffe41310d06528f87b23e27d3093cf")
        // console.log(tx)
        const topic = tx.logs[0]
        // console.log(Number(topic.topics[1]))

        // const log = iface.parseLog(topic)
        // console.log(log.args.tokenId)

        /*
        {
            to: '0xF18F8Cc9C1098eC3dA1Ac0b982F7dfea0227Ec65',
            from: '0x6e1433d411feb72C2f3F320175B74095a218018F',
            contractAddress: null,
            transactionIndex: 0,
            gasUsed: BigNumber { _hex: '0xc8d3', _isBigNumber: true },
            logsBloom: '0x00800000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008000000000000000000000000000000000000000000000000000000008000000000000000000000002000000000000000000000000000000000000000000200000000000000000000000000010000010000000000000000000000000000000000000000000000000000000000000000000800000000000000000100000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000',
            blockHash: '0x266394e85dcc863ccba1368791eb590d6f21a3818e30a51aec7e0a3a32ce59ae',
            transactionHash: '0x156cb03eb99e8eee3fbf9c192abb6b6819ffe41310d06528f87b23e27d3093cf',
            logs: [
                {
                transactionIndex: 0,
                blockNumber: 34998202,
                transactionHash: '0x156cb03eb99e8eee3fbf9c192abb6b6819ffe41310d06528f87b23e27d3093cf',
                address: '0xF18F8Cc9C1098eC3dA1Ac0b982F7dfea0227Ec65',
                topics: [Array],
                data: '0x0000000000000000000000000000000000000000000000004563918244f40000',
                logIndex: 0,
                blockHash: '0x266394e85dcc863ccba1368791eb590d6f21a3818e30a51aec7e0a3a32ce59ae'
                }
            ],
            blockNumber: 34998202,
            confirmations: 689,
            cumulativeGasUsed: BigNumber { _hex: '0xc8d3', _isBigNumber: true },
            status: 1,
            type: 2,
            byzantium: true
        }
        */
    } catch (e) {
        console.log(e)
        console.log(e.message)
    }
}

run()