require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    kovan: {
      url: `https://kovan.infura.io/v3/fda9e5002db342bab6a6f08ea7d0d779`,
      accounts: [`b7ebea05a90b8f9bfada65824c8ae78f110bb307f01608405ea1b7aa8073fa82`, `e2bcb7d8a9ceda763f9bc7de1e65686e17abf16b7eeb9fc5aee493ec09d8c2f8`]
    }
  },
  namedAccounts: {
    deployer: 0,
    testAddress1: 1,
  },
  mocha: {
    timeout: 240000
  }
};
