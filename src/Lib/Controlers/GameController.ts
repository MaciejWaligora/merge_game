import { InputHandler } from "../Handlers/InputHandler";
import { GridModel, GridModelConfig } from "../Models/GridModel";
import { TimerModel, TimerModelConfig } from "../Models/TimerModel";
import { GridView} from "../Views/GridView";
import { TimerView } from "../Views/TimerView";
import { ModelController, ModelControllerConfig } from "./ModelController";
import { TimerModelController, TimerModelControllerConfig } from "./TimerModelController";
import { TimerViewController, TimerViewControllerConfig } from "./TimerViewController";
import { ViewController, ViewControllerConfig } from "./ViewController";
export interface GameControllerConfig{
    gridModel: GridModel<GridModelConfig>;
    gridView: GridView;
    timerModel: TimerModel<TimerModelConfig>;
    timerView: TimerView;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _modelController: ModelController<ModelControllerConfig>;
    private _viewController: ViewController<ViewControllerConfig>;
    private _timerModelController: TimerModelController<TimerModelControllerConfig>;
    private _timerViewController: TimerViewController<TimerViewControllerConfig>;
    private _inputHandler: InputHandler;

    constructor(config: Tconfig){
        this._modelController = new ModelController(config);
        this._viewController = new ViewController(config);
        this._timerModelController = new TimerModelController(config);
        this._timerViewController = new TimerViewController(config);
        this._inputHandler = new InputHandler();

        this._modelController.tileClickedSignal.addListener(this.updateView, this);
        this._modelController.tileDestroyedSignal.addListener(this.destroyTile, this);
        this._timerModelController.gameOverSignal.addListener(this.onGameOver, this);
        this._timerModelController.timerTickSignal.addListener(this.onTimerTick, this);
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
    }

    public onTimerTick(progress: number | undefined){
        if(progress){
            this._timerViewController.setProgress(progress);
        }    
    }

    public onGameOver(){
        console.log("Game Over! Time is up");
    }

    public start(){
        this._timerModelController.start();
    }
}