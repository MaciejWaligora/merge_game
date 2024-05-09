import { InputHandler } from "../Handlers/InputHandler";
import { Signal } from "../Signal";
import { GridView} from "../Views/GridView";

export interface ViewControllerConfig{
    gridView: GridView;
}

export class ViewController <Tconfig extends ViewControllerConfig>{
    private _config: Tconfig;
    public tileClickedSignal = new Signal<number>();
    constructor(config: Tconfig){
        this._config = config;
        config.gridView.tileClickedSignal.addListener(this.onTileViewClicked, this);
    }

    public onTileViewClicked(index: number | undefined){
        this.tileClickedSignal.emit(index);
    }

    public updateView(index: number, state: boolean){
        const view = this._config.gridView.getTileViews()[index];
        if(state){
            view.select();
        }else{
            view.unselect();
        }
    }

    public destroyTile(index: number | undefined){
        this._config.gridView.destroyTile(index);
    }

    public getTile(index: number | undefined){
        if(index !== undefined){
           return this._config.gridView.getTileView(index);
        }
    }

    public getGrid(){
        return this._config.gridView;
    }

    public show(){
        this._config.gridView.show();
    }

    public removeInputFromTiles(){
        const tileViews = this._config.gridView.getTileViews();
        for(let tileView of tileViews){
            InputHandler.removeTilesClickHandler(tileView);
        }
    }

    public addInputToTiles(){
        const tileViews = this._config.gridView.getTileViews();
        for(let tileView of tileViews){
            InputHandler.attachTilesClickHandler(tileView);
        }
    }
}