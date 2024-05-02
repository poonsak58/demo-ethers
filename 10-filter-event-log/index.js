require("dotenv").config();
const { ethers, utils } = require("ethers");
const abi = require("./abi.json");

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const filePath = ".holder.csv";
const raw = fs.readFileSync(path.resolve(__dirname, "holder.csv"), "utf8");
const data = raw.split(/\r?\n/);

const data2json = []

const run = async () => {
  try {
    fs.appendFileSync(
        path.resolve(__dirname, "holder-using-warden.csv"),
        `"Holder Address","Quantity","Used Warden Router","Used TxHash"\n`,
        'utf8'
    )
    for (const [index, item] of data.entries()) {
      if (!item) continue;

      let [account, amount] = item.split(",");
      account = account.replace(/['"]+/g, "")
      amount = amount.replace(/['"]+/g, "")
      console.log(index + 1, account, amount);

      const [using, txHash] = await checkUsing(account);

      fs.appendFileSync(
        path.resolve(__dirname, "holder-using-warden.csv"),
        `"${account}",${amount},"${using ? 'true' : 'false'}", ${txHash}\n`,
        'utf8'
      )
    }
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
};

const checkUsing = async (walletAddress) => {
  try {
    // const walletAddress = '0x6e1433d411feb72C2f3F320175B74095a218018F'
    const url = `https://api-optimistic.etherscan.io/api?module=logs
        &action=getLogs
        &address=0x7EA8c22E6Dcd7bd69eb180664Da68e1f1F11D696
        &fromBlock=77846964
        &toBlock=109760814
        &topic0=0xa1053ef90d92e668a06dbab8af812d6d99e04d80c0d5af298fd8fdd3ab5f8280
        &topic3=${utils.hexZeroPad(walletAddress, 32)}
        &page=1
        &offset=1000
        &apikey=${process.env.API_KEY_OPTIMISM}`;

    const urlReal = url.replace(/(\r\n|\n|\r|\s)/g, "");
    console.log(urlReal);

    const r = await fetch(urlReal);
    const dt = await r.json();

    // console.log(dt)
    console.log(dt.status, dt.message)
    
    if (dt.status != "0") {
        let txHash = `https://optimistic.etherscan.io/tx/${dt.result[0].transactionHash}`
        return [true, txHash];
    }
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
  return [false, null];
};

run();

//    https://api-optimistic.etherscan.io/api?module=logs&action=getLogs&address=0x7EA8c22E6Dcd7bd69eb180664Da68e1f1F11D696&fromBlock=77846964&toBlock=109760814&topic0=0xa1053ef90d92e668a06dbab8af812d6d99e04d80c0d5af298fd8fdd3ab5f8280&topic3=0x000000000000000000000000bb612c3ecabb30680165b890e2660c345fe23c14&page=1&offset=1000&apikey=NNCG97IWVXBPBBXNPR8N4ISMSVMX9BUBMT

//    address: '0x7EA8c22E6Dcd7bd69eb180664Da68e1f1F11D696',
//   topics: [
//     '0xa1053ef90d92e668a06dbab8af812d6d99e04d80c0d5af298fd8fdd3ab5f8280'
//   ]
//    NNCG97IWVXBPBBXNPR8N4ISMSVMX9BUBMT
