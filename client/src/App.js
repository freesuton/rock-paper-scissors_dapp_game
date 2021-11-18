import React, {useState, useEffect} from 'react';
import RockPaperScissors from './contracts/RockPaperScissors.json';
import  Web3 from 'web3';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [testValue, setTestValue] = useState(undefined);
  const [choice, setChoice] = useState(undefined);
  const [result, setResult] = useState(undefined);


  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RockPaperScissors.networks[networkId];
      const contract = new web3.eth.Contract(
          RockPaperScissors.abi,
          deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });

  }, []);

  // async function makeChoice(e){
  //   e.preventDefault();
  //   const re = await contract.methods.test2().call();
  //   setTestValue(re);
  //   console.log(re);
  //   console.log(testValue);
  // }

  async function join(e){
    e.preventDefault();
    await contract.methods.join().send({from: accounts[0]});
    console.log(accounts[0]);
  }

  async function rock(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Rock").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log(re);
  }

  async function paper(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Paper").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log(("Paper"));
  }

  async function scissor(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Scissor").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log("Scissor");
  }

  async function showResult(e){
    e.preventDefault();
    var re =   await contract.methods.showResult().call();
    if(re == 3){
      re = "Player2 wins";
    }
    if(re == 2){
      re = "Player1 wins";
    }
    if(re == 1){
      re = "Deuce";
    }
    if(re == 0){
      re = "Please make choice";
    }
    setResult(re);
    console.log(re);
  }

  async function newGame(e){
    e.preventDefault();
    await contract.methods.finishGame().send({from: accounts[0]});


    console.log(34);
  }

  async function test2(e){
    e.preventDefault();
    const re = await contract.methods.test3().call();
    setTestValue(re);
    console.log(re);
    console.log(testValue);
  }

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="desk">

      </div>
      <h2 onClick = {e => join(e)}>join:</h2>
       <h2>Moves: </h2>
      <div>
        <div onClick = {e => rock(e)} >Rock</div>
        <div onClick = {e => paper(e)}>Paper</div>
        <div onClick = {e => scissor(e)}>Scissor</div>
        <div>Current Choice:</div>
      </div>



      <form onSubmit={e => showResult(e)}>

        <button type="submit">Submit</button>
        <button type="submit">Reveal Result</button>
        <p>{testValue && `Result: ${testValue}`}</p>
        <p>{result && `Result: ${result}`}</p>
      </form>
      <div> <button type="submit" onClick = {e => newGame(e)}>New Game</button></div>

    </div>
  );
}

export default App;
