import * as PIXI from 'pixijs'
import { AssetLoader } from "./Lib/AssetLoader";
import { SymbolGenerator } from "./Lib/SymbolGenerator";
import { GridModel, GridModelConfig } from "./Lib/Models/GridModel";
import { InputHandler } from "./Lib/Handlers/InputHandler";
import { GridView} from "./Lib/Views/GridView";
import { GameController, GameControllerConfig } from "./Lib/Controlers/GameController";
import { GameConfig } from './Config/GameConfig';
import { TimerModel } from './Lib/Models/TimerModel';
import { TimerView } from './Lib/Views/TimerView';
import { CounterModel } from './Lib/Models/CounterModel';
import { CounterView } from './Lib/Views/CounterView';

export interface Game{
    renderer: PIXI.Application,
    models:{
        gridModel: GridModel<GridModelConfig>
    },
    views:{
        gridView: GridView
    },
    controllers:{
        gameController: GameController<GameControllerConfig>
    }
}

export class GameFactory {

    public static async InitializeGame(config: GameConfig): Promise<Game>{

        const renderer = new PIXI.Application(config.display);
        AssetLoader.loadBackground(config.assets.background, renderer);
        const tileTextures = await AssetLoader.getTextures([config.assets.tile, config.assets.clickedTile]);
        const timerTextures = await AssetLoader.getTextures([config.timer.background, config.timer.bar]);
        const counterTextures = await AssetLoader.getTextures([config.counter.counterHandle, config.counter.counterLabel, config.counter.counterTile]);
        await AssetLoader.loadFont(config.counter.font);
        const symbolsForTheGame = SymbolGenerator.generateSymbols(config.grid.size);
        const grid = new GridModel({symbols: symbolsForTheGame});
        const timerModel = new TimerModel(config.timer);
        const counterModel = new CounterModel();
        const inputHandler = new InputHandler();
        
        const gridView = new GridView({
            tileTextures:{textureUnclicked: tileTextures[0], textureClicked: tileTextures[1]},
            size: config.grid.size, 
            renderer: renderer, 
            tileSpacing: config.grid.tilespacing
        });

        const tileViews = gridView.getTileViews();
        gridView.addSymbols(symbolsForTheGame);
        for(let tileView of tileViews){
            inputHandler.attachTilesClickHandler(tileView);
        }


        const timerView = new TimerView({
            renderer: renderer, 
            background: timerTextures[0], 
            progressBar: timerTextures[1]
        })
        timerView.show();
        timerView.setProgress(50);


        const counterView = new CounterView({
            renderer: renderer,
            counterHandle: counterTextures[0],
            counterLabel: counterTextures[1],
            counterTile: counterTextures[2],
            counterFont: 'Chango Regular'
        })

        const gameController = new GameController({
            gridModel: grid,
            gridView: gridView,
            timerModel: timerModel,
            timerView: timerView,
            counterModel: counterModel,
            counterView: counterView
          });
        

        gameController.init();
        gameController.start(); //TODO remove this after init popup is hooked up

        return {
            renderer: renderer,
            models: {
                gridModel: grid
            },
            views: {
                gridView: gridView
            },
            controllers: {
                gameController: gameController
            }
        }
    }

}