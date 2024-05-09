import { AnimationManager } from "../AnimationManager";
import { AudioManager, AudioManagerConfig } from "../AudioManager";
import { InputHandler } from "../Handlers/InputHandler";
import { CounterModel } from "../Models/CounterModel";
import { GameOverPopupModel } from "../Models/GameOverPopupModel";
import { GameWonPopupModel } from "../Models/GameWonPopupModel";
import { GridModel, GridModelConfig } from "../Models/GridModel";
import { StartPopupModel } from "../Models/StartPopupModel";
import { TimerModel, TimerModelConfig } from "../Models/TimerModel";
import { CounterView } from "../Views/CounterView";
import { GameOverPopupView, GameOverPopupViewConfig } from "../Views/GameOverPopupView";
import { GameWonPopupView, GameWonPopupViewConfig } from "../Views/GameWonPopupView";
import { GridView} from "../Views/GridView";
import { StartPopupView, StartPopupViewConfig } from "../Views/StartPopupView";
import { TimerView } from "../Views/TimerView";
import { View, ViewConfig } from "../Views/View";
import { CounterModelController, CounterModelControllerConfig } from "./CounterModelController";
import { CounterViewController, CounterViewControllerConfig } from "./CounterViewController";
import { GameOverPopupViewController, GameOverPopupViewControllerConfig } from "./GameOverPopupViewController";
import { GameWonPopupModelController } from "./GameWonPopupModelController";
import { GameWonPopupViewController, GameWonPopupViewControllerConfig } from "./GameWonPopupViewController";
import { GameOverPopupModelController } from "./GamoeOverPopupModelController";
import { ModelController, ModelControllerConfig } from "./ModelController";
import { StartPopupModelController, StartPopupModelControllerConfig } from "./StartPopupModelController";
import { StartPopupViewController, StartPopupViewControllerConfig } from "./StartPopupViewController";
import { TimerModelController, TimerModelControllerConfig } from "./TimerModelController";
import { TimerViewController, TimerViewControllerConfig } from "./TimerViewController";
import { ViewController, ViewControllerConfig } from "./ViewController";
import * as PIXI from 'pixijs'

export interface GameControllerConfig{
    gridModel: GridModel<GridModelConfig>;
    gridView: GridView;
    timerModel: TimerModel<TimerModelConfig>;
    timerView: TimerView;
    counterModel: CounterModel;
    counterView: CounterView;
    startPopupModel: StartPopupModel;
    gameOverPopupModel: GameOverPopupModel;
    gameWonPopupModel: GameWonPopupModel;
    startPopupView: StartPopupView<StartPopupViewConfig>;
    gameWonPopupView: GameWonPopupView<GameWonPopupViewConfig>;
    gameOverPopupView: GameOverPopupView<GameOverPopupViewConfig>;
    audioManager: AudioManager<AudioManagerConfig>;
    animationManager: AnimationManager;

}

export class GameController<Tconfig extends GameControllerConfig>{

    private _modelController: ModelController<ModelControllerConfig>;
    private _viewController: ViewController<ViewControllerConfig>;
    private _timerModelController: TimerModelController<TimerModelControllerConfig>;
    private _timerViewController: TimerViewController<TimerViewControllerConfig>;
    private _counterModelController: CounterModelController<CounterModelControllerConfig>;
    private _counterViewController: CounterViewController<CounterViewControllerConfig>;
    private _startPopupModelController: StartPopupModelController;
    private _gameOverPopupModelController: GameOverPopupModelController;
    private _gameWonPopupModelController: GameWonPopupModelController;
    private _startPopupViewController: StartPopupViewController<StartPopupViewControllerConfig>
    private _gameWonPopupViewController: GameWonPopupViewController<GameWonPopupViewControllerConfig>;
    private _gameOverPopupViewController: GameOverPopupViewController<GameOverPopupViewControllerConfig>;
    private _audioManager: AudioManager<AudioManagerConfig>;
    private _animationManager: AnimationManager;

    private _inputHandler: InputHandler;

    constructor(config: Tconfig){
        this._modelController = new ModelController(config);
        this._viewController = new ViewController(config);
        this._timerModelController = new TimerModelController(config);
        this._timerViewController = new TimerViewController(config);
        this._counterModelController = new CounterModelController(config);
        this._counterViewController = new CounterViewController(config);
        this._startPopupModelController = new StartPopupModelController({popupModel: config.startPopupModel});
        this._gameOverPopupModelController = new GameOverPopupModelController({popupModel: config.gameOverPopupModel});
        this._gameWonPopupModelController = new GameWonPopupModelController({popupModel: config.gameWonPopupModel});
        this._startPopupViewController = new StartPopupViewController(config);
        this._gameWonPopupViewController = new GameWonPopupViewController(config);
        this._gameOverPopupViewController = new GameOverPopupViewController(config);
        this._inputHandler = new InputHandler();

        this._audioManager =  config.audioManager;
        this._animationManager = config.animationManager;

        this._modelController.tileClickedSignal.addListener(this.updateView, this);
        this._modelController.tileDestroyedSignal.addListener(this.destroyTile, this);
        this._modelController.gameWonSignal.addListener(this.onGameWon, this);
        this._modelController.selectionClearedSignal.addListener(this.onSelectionClearedSignal, this);
        this._timerModelController.gameOverSignal.addListener(this.onGameOver, this);
        this._timerModelController.timerTickSignal.addListener(this.onTimerTick, this);
        this._counterModelController.counterChangeSignal.addListener(this.onCounterChange, this);
        this._startPopupModelController.openSignal.addListener(this.onStartPopupOpen, this);
        this._startPopupModelController.closeSignal.addListener(this.onStartPopupClose, this);
        this._gameOverPopupModelController.openSignal.addListener(this.onGameOverPopupOpen, this);
        this._gameOverPopupModelController.closeSignal.addListener(this.onGameOverPopupClose, this);
        this._gameWonPopupModelController.openSignal.addListener(this.onGameWonPopupOpen, this);
        this._gameWonPopupModelController.closeSignal.addListener(this.onGameWonpopupClose, this);
        this._gameWonPopupViewController.restartButtonSignal.addListener(this.onRestartButtonClicked, this);
        this._startPopupViewController.stratButtonClickedSignal.addListener(this.onStartButtonClicked, this);
        this._gameOverPopupViewController.restartButtonSignal.addListener(this.onRestartButtonClicked, this);

        this._startPopupModelController.show();
    }

    public init(){
        this._viewController.tileClickedSignal.addListener(this.updateModel, this);
    }

    public updateModel(index: number | undefined){
        if(index !== undefined){
            this._modelController.updateTileData(index)
        }
    }

    public updateView(data: {index:number, state: boolean} | undefined){
        if(data){
            this._viewController.updateView(data.index, data.state);
            if(data.state){
                const target = this._viewController.getTile(data.index) as View<ViewConfig>;
                this._animationManager.playLinearFullRotationAnimation(target , 10);
                this._audioManager.playSelectSound();
            }
        }  
    }

    public onSelectionClearedSignal(){
        this._audioManager.playUnselectSound();
    }

    public destroyTile(index: number | undefined){
        const target = this._viewController.getTile(index) as View<ViewConfig>;
        const counterViewPos = this._counterViewController.getCounterViewPos();
        this._animationManager.playTileDestoryAnimation(target, 30, counterViewPos);
        this._counterModelController.increaseCount();
    }

    public onTimerTick(progress: number | undefined){
        if(progress){
            this._timerViewController.setProgress(progress);
        }    
    }

    public onCounterChange(val: number | undefined){
        this._counterViewController.setCounterDisplay(val);
    }

    public onGameOver(){
        this._gameOverPopupModelController.show();
        this._audioManager.playFailSound();
    }

    public onGameWon(){
        const time = this._timerModelController.stop();
        this._gameWonPopupModelController.show();
        this._audioManager.playSuccessSound();
        
    }

    public onRestartButtonClicked(){
        this._audioManager.playButtonSound();
        window.location.reload();

    }

    public onStartButtonClicked(){
        this._audioManager.playButtonSound();
        this._startPopupModelController.hide();
    }

    public onStartPopupOpen(){
    }

    public onStartPopupClose(){
        this._start();
        this._startPopupViewController.hide();
    }

    public onGameOverPopupOpen(){
        this._gameOverPopupViewController.show();
        this._viewController.removeInputFromTiles();
    }

    public onGameOverPopupClose(){

    }

    public onGameWonPopupOpen(){
        const time = this._timerModelController.stop();
        this._gameWonPopupViewController.update(time/100)
        this._gameWonPopupViewController.show();
        this._viewController.removeInputFromTiles();
    }

    public onGameWonpopupClose(){}

    private _start(){
        this._timerModelController.start();
        this._viewController.addInputToTiles();
    }
}