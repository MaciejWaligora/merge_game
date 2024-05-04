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
        const symbolsForTheGame = SymbolGenerator.generateSymbols(config.grid.size);
        const grid = new GridModel({symbols: symbolsForTheGame});
        const timerModel = new TimerModel(config.timer);
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

        const gameController = new GameController({
            gridModel: grid,
            gridView: gridView,
            timerModel: timerModel
          });
        const timerView = new TimerView({
            renderer: renderer, 
            backgroundColor: config.timer.timerbackgroundcolor, 
            height: config.timer.progressBarHeight
        })

        timerView.show();
        timerView.setProgress(100);
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