import './App.css';
import { GameCanvas } from './Components/GameCanvas';
import * as PIXI from "pixijs"
import { SymbolGenerator } from './Lib/SymbolGenerator';
import { GridModel } from './Lib/Models/GridModel';
import { AssetLoader } from './Lib/AssetLoader';
import { GridView } from './Lib/Views/GridView';



const config = {
  display:{
    width: 1080,
    height: 1920
  },
  grid:{
    size: 16,
    tilespacing: 10
  },
  assets:{
    background: "./background.png",
    tile: "./tile.png"
  }
  
}

const renderer = new PIXI.Application(config.display);
const symbolsForTheGame = SymbolGenerator.generateSymbols(config.grid.size);
const grid = new GridModel({symbols: symbolsForTheGame});
let gridV:GridView;

AssetLoader.loadBackground(config.assets.background, renderer);
AssetLoader.getTextures([config.assets.tile]).then((textures: PIXI.Texture[])=>{
    gridV = new GridView({
    tileTextures:{textureUnclicked: textures[0], textureClicked: textures[1]},
    size: config.grid.size, 
    renderer: renderer, 
    tileSpacing: config.grid.tilespacing });

    gridV.addSymbols(symbolsForTheGame);
})

console.log(grid)
function App() {
  return (
    <div className="App">
      <GameCanvas pixiApp={renderer}></GameCanvas>
    </div>
  );
}

export default App;
