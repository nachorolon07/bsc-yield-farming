const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("test", function () {
  it("Deploys", async function () {
    const [owner] = await ethers.getSigners();

    const stakeTest = await ethers.getContractFactory("stakeTest");
    const nftTest = await ethers.getContractFactory("NFTCollection");
    const tokenTest = await ethers.getContractFactory("RewardToken");

    const nfttest = await nftTest.deploy("NFTTEST", "NFTT");
    const tokentest = await nftTest.deploy("TOKENTEST", "TKT");


    const staketest = await stakeTest.deploy(nfttest.address, tokentest.address);

    let example = staketest.stake([1,1,6,5])

    //staketest.calculateRewards(owner.address)

    


    
  });


  // describe("test ffunctions", function () {
  //   it("....", async function () {
      
  //     let example = staketest.stake(1)
      
  
      
  //   });
  
  // });



});



