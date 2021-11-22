const Idea = artifacts.require("Idea");

module.exports = function(deployer) {
  deployer.deploy(Idea);
};