const { ethers } = require("ethers");


async function test () {   

const contractAddress = "0xC3f5f6A5095267DDe7059353Cf653d422c6968DD";
const myContract = await hre.ethers.getContractAt("stakeTest", contractAddress);

console.log(myContract.address);

let examp = await myContract.stake([1,2]);
console.log(examp);



}

test()