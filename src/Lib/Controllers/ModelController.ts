import { GridModel, GridModelConfig } from "../Models/GridModel";
import { TileModel, TileModelConfig } from "../Models/TileModel";
import { Signal } from "../Signal";

export interface ModelControllerConfig{
    gridModel: GridModel<GridModelConfig>;
}

export class ModelController<Tconfig extends ModelControllerConfig>{
    private _config: Tconfig;
    public tileClickedSignal = new Signal<{index:number, state: boolean}>();
    public tileDestroyedSignal = new Signal<number>();
    public gameWonSignal = new Signal();
    public selectionClearedSignal = new Signal();

    constructor(config: Tconfig){
        this._config = config;
        config.gridModel.tileClickedSignal.addListener(this.onTileClicked, this);
        config.gridModel.tileDestroyedSignal.addListener(this.onTileDestroyedSignal, this);
    }

    public getTileData(index: number){
        return this._config.gridModel.getTileData(index);
    }

    public onTileClicked(data:{index:number, state: boolean} | undefined){
        this.tileClickedSignal.emit(data);
    }

    public onTileDestroyedSignal(index: number | undefined){
        this.tileDestroyedSignal.emit(index);
    }

    public updateTileData(index: number){
        const currentState = this.getTileData(index);
        const  grid = this._config.gridModel
        if(currentState.exists && !currentState.isClicked){
            this.addSelection(index);
        }else if(currentState.exists && currentState.isClicked){
            grid.updateTile(index, true, false);
            grid.removeSelection(index);
        }
    }

    public clearSelection(){
        this._config.gridModel.clearSelection();
    }


    public addSelection(index: number){
        const model = this._config.gridModel
        const currentSelection = model.getCurrentSelection();
        const tileToadd = model.getTileData(index);
        for (let selectedView of currentSelection){
            const symbol = selectedView.getSymbol();
            if(symbol !== tileToadd.symbol){
                this.clearSelection();
                this.selectionClearedSignal.emit();
                return 
            }
        }
        model.addSelection(index);
        model.updateTile(index, true, true);
        this.checkifSymbolCleared();
        
    }

    public checkifSymbolCleared(){
        const model = this._config.gridModel
        const currentSelection = model.getCurrentSelection();
        const symbol = currentSelection[0].getSymbol();
        const unique = model.getUniqueSymbols();
        if(currentSelection.length === unique[symbol]){
            for(let selected of currentSelection){
                selected.update({exists: false, isClicked: true});
            }
            this.clearSelection();
            this.checkifGridCleared()
        }
    }

    public checkifGridCleared(){
        const model = this._config.gridModel;
        const tiles = model.getTiles() as TileModel<TileModelConfig>[]
        const allTilesQty = tiles.length;
        let guessedTilesQty = 0;

        for(let tile of tiles){
            if(!tile.exists()){
                guessedTilesQty++;
            }
        }

        if(allTilesQty === guessedTilesQty){
            this.gameWonSignal.emit();
        }

    }


}