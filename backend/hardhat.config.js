require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_HTTP_URL = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai:{
      url:ALCHEMY_HTTP_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
