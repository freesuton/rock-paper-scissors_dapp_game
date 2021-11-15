import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="desk">
        <div className="part">Player1</div>
        <div className="part">Result</div>
        <div className="part">Player2</div>
      </div>
      <h2>Moves:</h2>
      <div>
        <span>Rock</span>
        <span>paper</span>
        <span>Scissor</span>
      </div>
      <h3>Submit</h3>
      <h3>New Game</h3>
    </div>
  );
}

export default App;
