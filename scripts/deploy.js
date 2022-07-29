const hre = require("hardhat");
const web3 = require("web3");


async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const NFTYieldFarming = await hre.ethers.getContractFactory("NFTYieldFarmingOnBSC");
  const MockNFTToken = await hre.ethers.getContractFactory("MockNFTToken");
  const BEP20LPToken = await hre.ethers.getContractFactory("BEP20LPToken");
  const BEP20GovernanceToken = await hre.ethers.getContractFactory("BEP20GovernanceToken");


  //// deploys dependencies

  const GovernanceToken = await BEP20GovernanceToken.deploy()
  const bep20LPToken = await BEP20LPToken.deploy()
  const nftToken = await MockNFTToken.deploy()

  console.log("GovernanceToken address:" + GovernanceToken.address + "bep20LPToken address: " + bep20LPToken.address + "nftToken address: " + nftToken.address)

  



//// Execute all methods


module.exports = function(callback) {
    main().then(() => callback()).catch(err => callback(err));
};

async function main() {
    console.log("\n------------- Check state in advance -------------");
    await checkStateInAdvance();

    console.log("\n------------- Setup smart-contracts -------------");
    await setUpSmartContracts();
    await transferOwnershipToNFTYieldFarmingContract();

    console.log("\n------------- Preparation for tests in advance -------------");
    await preparationForTestsInAdvance();

    console.log("\n------------- Process of the NFT yield farming -------------");
    await addNewNFTPoolAsATarget();
    await stake10LPTokens();
    await stake20LPTokens();
    await stake30LPTokens();
    await stake10MoreLPTokens();
    await totalSupplyOfGovernanceToken();
    await governanceTokenBalanceOfStaker();
    await governanceTokenBalanceOfAdmin();
    await governanceTokenBalanceOfNFTYieldFarmingOnBSCContract();
    await unstakeAndWithdraw();
}


////-----------------------------------------------
//// Methods
////-----------------------------------------------
async function checkStateInAdvance() {
    /// Assign addresses into global variables of wallets
    const deployer = process.env.DEPLOYER_WALLET;
    const admin = process.env.ADMIN_WALLET;
    console.log('=== deployer (staker) ===', deployer);
    console.log('=== admin ===', admin);
}

async function setUpSmartContracts() {
    
    console.log("Deploy the NFT token (ERC721) contract instance");
    
    const NFT_TOKEN = nftToken.address;

    console.log("Deploy the LP token (BEP20) contract instance");
    
    const LP_TOKEN = bep20LPToken.address;

    console.log("Deploy the Governance token (BEP20) contract instance");
    
    const GOVERNANCE_TOKEN = GovernanceToken.address;

    console.log("Deploy the NFTYieldFarming contract instance");
    const _devaddr = admin;  /// Admin address
    const _governanceTokenPerBlock = web3.utils.toWei("100", "ether");  /// [Note]: This unit is amount. Not blockNumber
    const _startBlock = "300";
    const _bonusEndBlock = "1000";

    const nftYieldFarming = await NFTYieldFarming.deploy(GOVERNANCE_TOKEN, _devaddr, _governanceTokenPerBlock, _startBlock, _bonusEndBlock, { from: deployer });
    const NFT_YIELD_FARMING = nftYieldFarming.address;
    console.log("NFT_YIELD_FARMING CONTRACT ADDRESS: " + NFT_YIELD_FARMING);

    /// contracts address
    console.log('=== NFT_TOKEN ===', NFT_TOKEN);    
    console.log('=== LP_TOKEN ===', LP_TOKEN);
    console.log('=== GOVERNANCE_TOKEN ===', GOVERNANCE_TOKEN);
    console.log('=== NFT_YIELD_FARMING ===', NFT_YIELD_FARMING);  
}

async function transferOwnershipToNFTYieldFarmingContract() {
    console.log("Transfer ownership of the Governance token (ERC20) contract to the NFTYieldFarming contract");
    const newOwner = NFT_YIELD_FARMING;
    const txReceipt = await governanceToken.transferOwnership(newOwner, { from: deployer });
}



////------------------------------
//// Process of NFT Yield Farming
////------------------------------
async function getCurrentBlock() {
    const currentBlock = await web3.eth.getBlockNumber();
    return currentBlock;
}

async function addNewNFTPoolAsATarget() {
    const currentBlock = await getCurrentBlock();

    console.log(`Add a new NFT Pool as a target of yield farming (at block ${currentBlock})`);
    const _nftToken = NFT_TOKEN;   
    const _lpToken = LP_TOKEN;     
    const _allocPoint = "100";
    const _withUpdate = true;
    let txReceipt = await nftYieldFarming.addNFTPool(_nftToken, _lpToken, _allocPoint, _withUpdate, { from: deployer });
}

async function stake10LPTokens() {
    const currentBlock = await getCurrentBlock();

    console.log(`Stake 10 LP tokens into a NFT Pool at block ${currentBlock}`);
    const _nftPoolId = 0;
    const _stakeAmount = web3.utils.toWei('10', 'ether');  /// 10 LP Token
    let txReceipt1 = await lpToken.approve(NFT_YIELD_FARMING, _stakeAmount, { from: deployer });
    let txReceipt2 = await nftYieldFarming.deposit(_nftPoolId, _stakeAmount, { from: deployer });
}

async function stake20LPTokens() {
    const currentBlock = await getCurrentBlock();

    console.log(`Stake 20 LP tokens into a NFT Pool at block ${currentBlock}`);
    
    const _nftPoolId = 0;
    const _stakeAmount = web3.utils.toWei('20', 'ether');  /// 20 LP Token
    let txReceipt1 = await lpToken.approve(NFT_YIELD_FARMING, _stakeAmount, { from: deployer });
    let txReceipt2 = await nftYieldFarming.deposit(_nftPoolId, _stakeAmount, { from: deployer });
}

async function stake30LPTokens() {
    const currentBlock = await getCurrentBlock();

    console.log(`Stake 30 LP tokens into a NFT Pool at block ${currentBlock}`);
    const _nftPoolId = 0;
    const _stakeAmount = web3.utils.toWei('30', 'ether');  /// 30 LP Token
    let txReceipt1 = await lpToken.approve(NFT_YIELD_FARMING, _stakeAmount, { from: deployer });
    let txReceipt2 = await nftYieldFarming.deposit(_nftPoolId, _stakeAmount, { from: deployer });
}

async function stake10MoreLPTokens() {
    const currentBlock = await getCurrentBlock();

    console.log(`Stake 10 more LP tokens into a NFT Pool at block ${currentBlock}`);
    const _nftPoolId = 0;
    const _stakeAmount = web3.utils.toWei('10', 'ether');  /// 10 LP Token
    let txReceipt1 = await lpToken.approve(NFT_YIELD_FARMING, _stakeAmount, { from: deployer });
    let txReceipt2 = await nftYieldFarming.deposit(_nftPoolId, _stakeAmount, { from: deployer });
}

async function totalSupplyOfGovernanceToken() {
    ///  ex). Assuming that starting block is at 310 and current block at 321: 
    ///         - TotalSupply of GovernanceToken: 1000 * (321 - 310) = 11000
    ///         - A staker should have: 4*1000 + 4*1/3*1000 + 2*1/6*1000 = 5666
    ///         - NFTYieldFarming contract should have the remaining: 10000 - 5666 = 4334
    let _totalSupplyOfGovernanceToken = await governanceToken.totalSupply();
    const totalSupplyOfGovernanceToken = Math.round(web3.utils.fromWei(String(_totalSupplyOfGovernanceToken), 'ether'));
    const currentBlock = await getCurrentBlock();
    console.log(`Total Supply of the GovernanceToken should be ${totalSupplyOfGovernanceToken} (at block ${currentBlock})`);
}

async function governanceTokenBalanceOfStaker() {
    let _governanceTokenBalanceOfDeployer = await governanceToken.balanceOf(deployer, { from: deployer });
    const governanceTokenBalanceOfDeployer = Math.round(web3.utils.fromWei(String(_governanceTokenBalanceOfDeployer), 'ether'));
    const currentBlock = await getCurrentBlock();
    console.log(`GovernanceToken balance of a staker should be ${governanceTokenBalanceOfDeployer} (at block ${currentBlock})`);
}

async function governanceTokenBalanceOfAdmin() {
    let _governanceTokenBalanceOfAdmin = await governanceToken.balanceOf(admin, { from: admin });
    const governanceTokenBalanceOfAdmin = Math.round(web3.utils.fromWei(String(_governanceTokenBalanceOfAdmin), 'ether'));
    const currentBlock = await getCurrentBlock();
    console.log(`GovernanceToken balance of admin should be ${governanceTokenBalanceOfAdmin} (at block ${currentBlock})`);
}

async function governanceTokenBalanceOfNFTYieldFarmingOnBSCContract() {
    let _governanceTokenBalance = await governanceToken.balanceOf(NFT_YIELD_FARMING, { from: deployer });
    const governanceTokenBalance = Math.round(web3.utils.fromWei(String(_governanceTokenBalance), 'ether'));
    const currentBlock = await getCurrentBlock();
    console.log(`GovernanceToken balance of the NFTYieldFarmingOnBSC contract should be ${governanceTokenBalance} (at block ${currentBlock})`);
}

async function unstakeAndWithdraw() {
    const _nftPoolId = 0;
    const _unStakeAmount = web3.utils.toWei('10', 'ether');  /// 10 LP Token
    let txReceipt = await nftYieldFarming.withdraw(_nftPoolId, _unStakeAmount, { from: deployer });

    let _governanceTokenBalanceOfDeployer = await governanceToken.balanceOf(deployer, { from: deployer });
    const governanceTokenBalanceOfDeployer = Math.round(web3.utils.fromWei(String(_governanceTokenBalanceOfDeployer), 'ether'));
    const currentBlock = await getCurrentBlock();
    console.log(`Un-stake (withdraw) 10 LP tokens and receive ${governanceTokenBalanceOfDeployer} GovernanceToken as rewards (at block ${currentBlock})`);
}



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
