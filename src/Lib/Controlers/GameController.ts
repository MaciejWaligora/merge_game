import { InputHandler } from "../Handlers/InputHandler";
import { GridModel, GridModelConfig } from "../Models/GridModel";
import { GridView} from "../Views/GridView";
import { ModelController, ModelControllerConfig } from "./ModelController";
import { ViewController, ViewControllerConfig } from "./ViewController";
export interface GameControllerConfig{
    gridModel: GridModel<GridModelConfig>;
    gridView: GridView;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _modelController: ModelController<ModelControllerConfig>;
    private _viewController: ViewController<ViewControllerConfig>;
    private _inputHandler: InputHandler;

    constructor(config: Tconfig){
        this._modelController = new ModelController(config);
        this._viewController = new ViewController(config);
        this._inputHandler = new InputHandler();

        this._modelController.tileClickedSignal.addListener(this.updateView, this);
        this._modelController.tileDestroyedSignal.addListener(this.destroyTile, this);
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
}