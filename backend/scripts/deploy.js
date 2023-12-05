// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");
require("dotenv").config({path:".env"});

const main = async () => {
   const contractFactory = await ethers.getContractFactory("deploy"); 
   const contract = await contractFactory.deploy();
   await contract.deployed();
   console.log("contract balance is :", contract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
