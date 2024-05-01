import './App.css';
import { GameCanvas } from './Components/GameCanvas';
import * as PIXI from "pixijs"

const config = {
  width: 800,
  height: 600
}

const renderer = new PIXI.Application(config);

function App() {
  return (
    <div className="App">
      <GameCanvas pixiApp={renderer}></GameCanvas>
    </div>
  );
}

export default App;
