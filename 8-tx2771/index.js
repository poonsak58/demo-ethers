require("dotenv").config();
const forwardAbi = require("./abi.json");
const { EIP712Domain, ForwardRequest } = require("./eip2771-abi.js")
const { ethers, utils } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://rpc.j2o.io");

const payload = {
  contract_address: "0xc53353553294b6970CA97620F3D22D62C7E49303",
  contract_method_name: "setPlatformFee(uint256)",
  contract_method_params: ["5000000000000000000"],
  contract_method_typeparam: ["uint256"],
  wallet_address: "0x999999389Aaf8f94BAe85e01d134a6AE6f9c2c2D",
};

const CONFIG = {
  CALLBACK_URL: "/v1/metatx/send",
  RPC_URL: "https://rpc.j2o.io",
  CHAIN_ID: "35011",
  DOMAIN: "FanBlockForwarder",
  VERSION: "0.0.1",
  FORWARDER_CONTRACT: "0x14894710CF51E648E899A68E99BF82D0bF3cF9cf",
};


const genTx = async () => {
  try {
    const chainId = CONFIG.CHAIN_ID;
    const name = CONFIG.DOMAIN;
    const version = CONFIG.VERSION;

    const verifyingContract = CONFIG.FORWARDER_CONTRACT;
    const forwarderContract = new ethers.Contract(
      verifyingContract,
      forwardAbi,
      provider
    );

    const targetContract = new ethers.Contract(payload.contract_address, [`function ${payload.contract_method_name}(${payload.contract_method_typeparam.join(",")})`], provider)
    // targetContract[]
    const value = 0;
    const gas = 210000000;
    const from = payload.wallet_address;
    const to = payload.contract_address;

    const fnSignatureTransfer = utils
      .keccak256(utils.toUtf8Bytes(payload.contract_method_name))
      .substring(0, 10);

    const fnParamsTransfer = utils.defaultAbiCoder.encode(
      payload.contract_method_typeparam,
      payload.contract_method_params
    );

    const data = fnSignatureTransfer + fnParamsTransfer.substring(2);

    const nonceRaw = await forwarderContract.getNonce(from);
    const nonce = Number(ethers.utils.formatUnits(nonceRaw, "wei"));
    const metatx = {
      primaryType: "ForwardRequest",
      types: { EIP712Domain, ForwardRequest },
      domain: { name, version, chainId, verifyingContract },
      message: { from, to, value, gas, nonce, data },
    };

    return { metatx: metatx, callback: CONFIG.CALLBACK_URL };
  } catch (err) {
    console.log("genTx:", err);
    throw new Error(err);
  }
};

const run = async () => {
  const data = await genTx();
  console.log(data);
  return;
  // console.log(process.env.PRIVATE_KEY.split(","))
  const [gasTank, userSign] = process.env.PRIVATE_KEY.split(",").map(
    (r) => "0x" + r
  );
  console.log(gasTank, userSign);

  const wallet = new ethers.Wallet(gasTank, provider);
  const forwarderContract = new ethers.Contract(
    "0x14894710CF51E648E899A68E99BF82D0bF3cF9cf",
    forwardAbi,
    wallet
  );

  const recoverSign = recoverTypedSignature_v4({
    data: data.metatx,
    sig: data.signature,
  });

  console.log("recoverSign", recoverSign);

  const estimation = await forwarderContract.estimateGas.execute(
    data.metatx.message,
    data.signature
  );

  const estimationValue = ethers.utils.formatUnits(estimation, "wei");
  console.log("estimate", estimationValue);

  const transaction = await forwarderContract.execute(
    data.metatx.message,
    data.signature,
    {
      gasLimit: estimationValue,
    }
  );
  console.log("hash", transaction.hash);
  const trans = await transaction.wait();

  const res = {
    success: true,
    txhash: transaction.hash,
    paymaster: trans.from,
    fee: parseInt(trans.gasUsed._hex, 16),
  };
  console.log(res);
  // try {
  //     const functionData = Contract.interface.encodeFunctionData("mintNFTForRequest", [1])
  //     console.log(functionData)
  //     provider.call()
  //     // const trx = await Contract.callStatic.mintNFTForRequest(
  //     //     3,
  //     // { from: "0x4f23dba94129f448deb66072e213815bd556d333" })
  // } catch (e) {

  //     console.log(e)
  //     console.log(e.message)
  //     console.log(e.reason)

  // }
};

run();
