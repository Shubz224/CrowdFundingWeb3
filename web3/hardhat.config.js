require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    defaultNetwork: "sepolia",
      networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/bmErx4ejf1RtOlvpGDN4xR3m7opbqInR', // Use your Alchemy URL here
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Add your MetaMask private key
    },
  },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
