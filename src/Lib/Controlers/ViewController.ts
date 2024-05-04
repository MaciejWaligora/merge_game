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
}