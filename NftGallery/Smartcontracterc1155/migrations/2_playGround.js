const playGround = artifacts.require("./playGround.sol");

module.exports = function (deployer) {
  deployer.deploy(playGround, 'threeCollections', '3COL');
};
