import { InputHandler } from "../Handlers/InputHandler";
import { CounterModel } from "../Models/CounterModel";
import { GridModel, GridModelConfig } from "../Models/GridModel";
import { TimerModel, TimerModelConfig } from "../Models/TimerModel";
import { CounterView } from "../Views/CounterView";
import { GridView} from "../Views/GridView";
import { TimerView } from "../Views/TimerView";
import { CounterModelController, CounterModelControllerConfig } from "./CounterModelController";
import { CounterViewController, CounterViewControllerConfig } from "./CounterViewController";
import { ModelController, ModelControllerConfig } from "./ModelController";
import { TimerModelController, TimerModelControllerConfig } from "./TimerModelController";
import { TimerViewController, TimerViewControllerConfig } from "./TimerViewController";
import { ViewController, ViewControllerConfig } from "./ViewController";
export interface GameControllerConfig{
    gridModel: GridModel<GridModelConfig>;
    gridView: GridView;
    timerModel: TimerModel<TimerModelConfig>;
    timerView: TimerView;
    counterModel: CounterModel;
    counterView: CounterView;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _modelController: ModelController<ModelControllerConfig>;
    private _viewController: ViewController<ViewControllerConfig>;
    private _timerModelController: TimerModelController<TimerModelControllerConfig>;
    private _timerViewController: TimerViewController<TimerViewControllerConfig>;
    private _counterModelController: CounterModelController<CounterModelControllerConfig>;
    private _counterViewController: CounterViewController<CounterViewControllerConfig>;

    private _inputHandler: InputHandler;

    constructor(config: Tconfig){
        this._modelController = new ModelController(config);
        this._viewController = new ViewController(config);
        this._timerModelController = new TimerModelController(config);
        this._timerViewController = new TimerViewController(config);
        this._counterModelController = new CounterModelController(config);
        this._counterViewController = new CounterViewController(config);
        this._inputHandler = new InputHandler();

        this._modelController.tileClickedSignal.addListener(this.updateView, this);
        this._modelController.tileDestroyedSignal.addListener(this.destroyTile, this);
        this._timerModelController.gameOverSignal.addListener(this.onGameOver, this);
        this._timerModelController.timerTickSignal.addListener(this.onTimerTick, this);
        this._counterModelController.counterChangeSignal.addListener(this.onCounterChange, this);
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
        }  
    }

    public destroyTile(index: number | undefined){
        this._viewController.destroyTile(index);
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
        console.log("Game Over! Time is up");
    }

    public start(){
        this._timerModelController.start();
    }
}