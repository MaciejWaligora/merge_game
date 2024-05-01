import './App.css';
import { GameCanvas } from './Components/GameCanvas';

const config = {
  width: 800,
  height: 600
}

function App() {
  return (
    <div className="App">
      <GameCanvas {...config}></GameCanvas>
    </div>
  );
}

export default App;
