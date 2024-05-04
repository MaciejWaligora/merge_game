import { GridModel, GridModelConfig } from "../Models/GridModel";
import { Signal } from "../Signal";

export interface ModelControllerConfig{
    gridModel: GridModel<GridModelConfig>;
}

export class ModelController<Tconfig extends ModelControllerConfig>{
    private _config: Tconfig;
    public tileClickedSignal = new Signal<{index:number, state: boolean}>();
    constructor(config: Tconfig){
        this._config = config;
        config.gridModel.tileClickedSignal.addListener(this.onTileClicked, this);
    }

    public getTileData(index: number){
        return this._config.gridModel.getTileData(index);
    }

    public onTileClicked(data:{index:number, state: boolean} | undefined){
        this.tileClickedSignal.emit(data);
    }

    public updateTileData(index: number){
        const currentState = this.getTileData(index);
        const  grid = this._config.gridModel
        if(currentState.exists && !currentState.isClicked){
            grid.updateTile(index, true, true);
        }else if(currentState.exists && currentState.isClicked){
            grid.updateTile(index, true, false);
        }
    }

}