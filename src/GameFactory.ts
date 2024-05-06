import * as PIXI from 'pixijs'
import { AssetLoader } from "./Lib/AssetLoader";
import { SymbolGenerator } from "./Lib/SymbolGenerator";
import { GridModel, GridModelConfig } from "./Lib/Models/GridModel";
import { InputHandler } from "./Lib/Handlers/InputHandler";
import { GridView} from "./Lib/Views/GridView";
import { GameController, GameControllerConfig } from "./Lib/Controllers/GameController";
import { GameConfig } from './Config/GameConfig';
import { TimerModel } from './Lib/Models/TimerModel';
import { TimerView } from './Lib/Views/TimerView';
import { CounterModel } from './Lib/Models/CounterModel';
import { CounterView } from './Lib/Views/CounterView';
import { StartPopupModel } from './Lib/Models/StartPopupModel';
import { GameWonPopupModel } from './Lib/Models/GameWonPopupModel';
import { GameOverPopupModel } from './Lib/Models/GameOverPopupModel';
import { StartPopupView } from './Lib/Views/StartPopupView';
import { GameWonPopupView } from './Lib/Views/GameWonPopupView';
import { GameOverPopupView } from './Lib/Views/GameOverPopupView';

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
        const startPopupTexture = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.startPopupTextBackgroundTexture, config.popups.startPopupTextTexture, config.popups.popupButtonTexture, config.popups.startPopupButtonTextTexture]);
        const gameWonPopupTexture = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.gameWonTextBackgroundTexture, config.popups.gameWonTextTexture, config.popups.gameWonTimeInfoBackground]);
        const gameOverPopupTextures = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.gameOverPopupTextBackgroundTexture, config.popups.gameOverPopupText, config.popups.popupButtonTexture, config.popups.gameOverPopupButtonText])
        await AssetLoader.loadFont(config.counter.font);
        const symbolsForTheGame = SymbolGenerator.generateSymbols(config.grid.size);
        const grid = new GridModel({symbols: symbolsForTheGame});
        const timerModel = new TimerModel(config.timer);
        const counterModel = new CounterModel();
        const startPopupModel = new StartPopupModel();
        const gameWonPopupModel = new GameWonPopupModel();
        const gameOverPopupModel = new GameOverPopupModel();
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


        const counterView = new CounterView({
            renderer: renderer,
            counterHandle: counterTextures[0],
            counterLabel: counterTextures[1],
            counterTile: counterTextures[2],
            counterFont: 'Chango Regular'
        })
        counterView.show();

        const startPopupView = new StartPopupView({
            renderer: renderer,
            backgroundTexture: startPopupTexture[0],
            textBackgroundTexture: startPopupTexture[1],
            text: startPopupTexture[2],
            buttonTexture: startPopupTexture[3],
            buttonTextTexture: startPopupTexture[4]
        });

        startPopupView.show();
        const startbutton = startPopupView.getButton();
        inputHandler.attachButtonClickHandler(startbutton);

        const gameWonPopupView = new GameWonPopupView({
            renderer: renderer,
            backgroundTexture: gameWonPopupTexture[0],
            textBackgroundTexture: gameWonPopupTexture[1],
            text: gameWonPopupTexture[2],
            timeInfoBackground: gameWonPopupTexture[3],
            font: 'Chango Regular'
        });

        const gameOverPopupView = new GameOverPopupView({
            renderer: renderer,
            backgroundTexture: gameOverPopupTextures[0],
            textBackgroundTexture: gameOverPopupTextures[1],
            text: gameOverPopupTextures[2],
            buttonTexture: gameOverPopupTextures[3],
            buttonTextTexture: gameOverPopupTextures[4]
        })

        const restratButton  = gameOverPopupView.getButton();
        inputHandler.attachButtonClickHandler(restratButton);


        const gameController = new GameController({
            gridModel: grid,
            gridView: gridView,
            timerModel: timerModel,
            timerView: timerView,
            counterModel: counterModel,
            counterView: counterView,
            gameOverPopupModel: gameOverPopupModel,
            gameWonPopupModel: gameWonPopupModel,
            startPopupModel: startPopupModel,
            startPopupView: startPopupView,
            gameWonPopupView: gameWonPopupView,
            gameOverPopupView: gameOverPopupView
          });
        

        gameController.init();

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