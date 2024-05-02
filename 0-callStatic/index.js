require("dotenv").config();
const { ethers } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

const run = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    // "https://rpc.j2o.io"
    "https://rpc.chiadochain.net"
  );

  const abi = [
    "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
    "function IID_IERC1155() view returns (bytes4)",
    "function IID_IERC165() view returns (bytes4)",
    "function IID_IERC721() view returns (bytes4)",
    "function sell(address,uint256,address,uint256,uint256,uint256,uint256) returns (uint256)",
    "function supportsInterface(bytes4) view returns (bool)",
    "function transferByAdmin(uint256,uint256,address)",
    "function updateForwarder(address)",
    
    /* NFT */
    "function setApprovalForAll(address operator, bool approved)",
    "function isApprovedForAll(address owner, address operator) view returns (bool)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function ownerOf(uint256 tokenId) view returns (address)",
  ];

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  const TestContract = new ethers.Contract(
    // "0x43A6DB872b7C1F15A5E4b6f54Af96f008203CA47", // Marketplace
    "0x70Ef7035055a780D04974d16712685c695c7A4D9", // nft
    abi,
    wallet
  );

  const a = JSON.parse(process.env.FIREBASE)
  console.log(a, process.env.AA)

  try {
    // let feeData = await provider.getFeeData();

    // await TestContract.callStatic.sell(
    //   "0x70Ef7035055a780D04974d16712685c695c7A4D9",
    //   2,
    //   "0x34a64da44337Cc1DA472202Ebc6615F32c29dC29",
    //   parseEther("500"),
    //   1,
    //   Math.floor(new Date().getTime() / 1000),
    //   Math.floor(new Date().getTime() / 1000 + 3600),
    // );


    // await TestContract.setApprovalForAll("0x43A6DB872b7C1F15A5E4b6f54Af96f008203CA47", false, {
    //     maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
    //     maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
    // })
    // const a = await TestContract.isApprovedForAll("0x17a053dbb197c4f2a5e80ffd18a2375925bdc6e9", "0x43A6DB872b7C1F15A5E4b6f54Af96f008203CA47")
    // console.log(a)

    // const a = await TestContract.supportsInterface(0x80ac58cd)
    // console.log(a)

    // console.log('Sending...\nTransaction hash: ', trx.hash)
    // console.log('wating transaction to be confirmed...')

    // await trx.wait()
    // console.log('Transaction confirmed.')

    // const TOKEN_balance = await TOKEN_Contract.balanceOf("0xda6a4d0ecB2310Fd83cC42CA1Cb5666008E40E5A")
    // const TOKEN_symbol = await TOKEN_Contract.symbol()

    // console.log(ethers.utils.formatEther(TOKEN_balance), TOKEN_symbol)
  } catch (e) {
    console.log("Error:", e);
    console.log("Reason:", e.reason);
  }
};

run();
