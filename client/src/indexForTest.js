const Web3 = require('web3');
const RockPaperScissors = require('./contracts/RockPaperScissors.json');

const init = async() => {
  const web3 = new Web3("http://localhost:9545");
  const id = await web3.eth.net.getId();
  const deployedNetwork = RockPaperScissors.networks[id];
  const contract = new web3.eth.Contract(
      RockPaperScissors.abi,
      deployedNetwork.address
  );

  const re = await contract.methods.test2().call();
  console.log(re);
}
init();