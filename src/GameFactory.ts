import * as PIXI from 'pixijs'
import { AssetLoader } from "./Lib/AssetLoader";
import { SymbolGenerator } from "./Lib/SymbolGenerator";
import { GridModel, GridModelConfig } from "./Lib/Models/GridModel";
import { InputHandler } from "./Lib/Handlers/InputHandler";
import { GridView} from "./Lib/Views/GridView";
import { GameController, GameControllerConfig } from "./Lib/Controllers/GameController";
import { GameConfig } from './Config/GameConfig';
import { TimerModel, TimerModelConfig } from './Lib/Models/TimerModel';
import { TimerView } from './Lib/Views/TimerView';
import { CounterModel } from './Lib/Models/CounterModel';
import { CounterView } from './Lib/Views/CounterView';
import { StartPopupModel } from './Lib/Models/StartPopupModel';
import { GameWonPopupModel } from './Lib/Models/GameWonPopupModel';
import { GameOverPopupModel } from './Lib/Models/GameOverPopupModel';
import { StartPopupView } from './Lib/Views/StartPopupView';
import { GameWonPopupView } from './Lib/Views/GameWonPopupView';
import { GameOverPopupView } from './Lib/Views/GameOverPopupView';
import { Scaler } from './Lib/Scaler';
import { AudioManager } from './Lib/AudioManager';
import { AnimationManager } from './Lib/AnimationManager';

export interface Game{
    renderer: PIXI.Application,
    models:{
        gridModel: GridModel<GridModelConfig>,
        counterModel: CounterModel,
        timerModel: TimerModel<TimerModelConfig>,
        startPopupModel: StartPopupModel,
        gameWonPopupModel: GameWonPopupModel,
        gameOverPopupModel: GameOverPopupModel
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
        const textures = await GameFactory.loadAssets(config, renderer);
        const symbolsForTheGame = SymbolGenerator.generateSymbols(config.grid.size);
        const models = await GameFactory.loadModels(config, symbolsForTheGame);
        const audioManager = new AudioManager(config.audio);
        const animationManager = new AnimationManager();
        renderer.ticker.add(delta => {
            animationManager.update(delta);
            animationManager.flushFinishedAnimations();
        });

        const gridView = new GridView({
            tileTextures:{textureUnclicked: textures.tileTextures[0], textureClicked: textures.tileTextures[1]},
            size: config.grid.size, 
            renderer: renderer, 
            tileSpacing: config.grid.tilespacing
        });

        gridView.addSymbols(symbolsForTheGame);
        


        const timerView = new TimerView({
            renderer: renderer, 
            background: textures.timerTextures[0], 
            progressBar: textures.timerTextures[1]
        })
        timerView.show();


        const counterView = new CounterView({
            renderer: renderer,
            counterHandle: textures.counterTextures[0],
            counterLabel: textures.counterTextures[1],
            counterTile: textures.counterTextures[2],
            counterFont: 'Chango Regular'
        })
        counterView.show();

        const startPopupView = new StartPopupView({
            renderer: renderer,
            backgroundTexture: textures.startPopupTexture[0],
            textBackgroundTexture: textures.startPopupTexture[1],
            text: textures.startPopupTexture[2],
            buttonTexture: textures.startPopupTexture[3],
            buttonTextTexture: textures.startPopupTexture[4]
        });

        startPopupView.show();
        const startbutton = startPopupView.getButton();
        InputHandler.attachButtonClickHandler(startbutton);

        const gameWonPopupView = new GameWonPopupView({
            renderer: renderer,
            backgroundTexture: textures.gameWonPopupTexture[0],
            textBackgroundTexture: textures.gameWonPopupTexture[1],
            text: textures.gameWonPopupTexture[2],
            timeInfoBackground: textures.gameWonPopupTexture[3],
            buttonTexture: textures.gameOverPopupTextures[3],
            buttonTextTexture: textures.gameOverPopupTextures[4],
            font: 'Chango Regular'
        });

        const gameWonRestratButton = gameWonPopupView.getButton();
        InputHandler.attachButtonClickHandler(gameWonRestratButton);

        const gameOverPopupView = new GameOverPopupView({
            renderer: renderer,
            backgroundTexture: textures.gameOverPopupTextures[0],
            textBackgroundTexture: textures.gameOverPopupTextures[1],
            text: textures.gameOverPopupTextures[2],
            buttonTexture: textures.gameOverPopupTextures[3],
            buttonTextTexture: textures.gameOverPopupTextures[4]
        })

        const gameOverRestratButton  = gameOverPopupView.getButton();
        InputHandler.attachButtonClickHandler(gameOverRestratButton);


        const gameController = new GameController({
            gridModel: models.grid,
            gridView: gridView,
            timerModel: models.timerModel,
            timerView: timerView,
            counterModel: models.counterModel,
            counterView: counterView,
            gameOverPopupModel: models.gameOverPopupModel,
            gameWonPopupModel: models.gameWonPopupModel,
            startPopupModel: models.startPopupModel,
            startPopupView: startPopupView,
            gameWonPopupView: gameWonPopupView,
            gameOverPopupView: gameOverPopupView,
            audioManager: audioManager,
            animationManager: animationManager
          });
        

        gameController.init();

        

        return {
            renderer: renderer,
            models: {
                gridModel: models.grid,
                timerModel: models.timerModel,
                counterModel: models.counterModel,
                startPopupModel: models.startPopupModel,
                gameWonPopupModel: models.gameWonPopupModel,
                gameOverPopupModel: models.gameOverPopupModel
            },
            views: {
                gridView: gridView
            },
            controllers: {
                gameController: gameController
            }
        }
    }

    public static async loadAssets(config: GameConfig, renderer: PIXI.Application){

        await AssetLoader.loadBackground(config.assets.background, renderer);

        const tileTextures = await AssetLoader.getTextures([config.assets.tile, config.assets.clickedTile]);
        const timerTextures = await AssetLoader.getTextures([config.timer.background, config.timer.bar]);
        const counterTextures = await AssetLoader.getTextures([config.counter.counterHandle, config.counter.counterLabel, config.counter.counterTile]);
        const startPopupTexture = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.startPopupTextBackgroundTexture, config.popups.startPopupTextTexture, config.popups.popupButtonTexture, config.popups.startPopupButtonTextTexture]);
        const gameWonPopupTexture = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.gameWonTextBackgroundTexture, config.popups.gameWonTextTexture, config.popups.gameWonTimeInfoBackground]);
        const gameOverPopupTextures = await AssetLoader.getTextures([config.popups.backgroundtexture, config.popups.gameOverPopupTextBackgroundTexture, config.popups.gameOverPopupText, config.popups.popupButtonTexture, config.popups.gameOverPopupButtonText])

        await AssetLoader.loadFont(config.counter.font);

        return {
            tileTextures: tileTextures,
            timerTextures: timerTextures,
            counterTextures: counterTextures,
            startPopupTexture: startPopupTexture,
            gameWonPopupTexture: gameWonPopupTexture,
            gameOverPopupTextures: gameOverPopupTextures
        }
    }

    public static async loadModels(config: GameConfig, symbolsForTheGame: string[]){
        const grid = new GridModel({symbols: symbolsForTheGame});
        const timerModel = new TimerModel(config.timer);
        const counterModel = new CounterModel();
        const startPopupModel = new StartPopupModel();
        const gameWonPopupModel = new GameWonPopupModel();
        const gameOverPopupModel = new GameOverPopupModel();

        return {
            grid: grid,
            timerModel: timerModel,
            counterModel: counterModel,
            startPopupModel: startPopupModel,
            gameWonPopupModel: gameWonPopupModel,
            gameOverPopupModel: gameOverPopupModel
        }
    }

}