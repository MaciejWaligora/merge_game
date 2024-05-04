import { Model } from "./Model";
import { Signal } from "../Signal";


export interface TileModelConfig{
    index: number;
    symbol: string;
}

export interface TileData{
    exists: boolean;
    isClicked: boolean;
}



export class TileModel<Tconfig extends TileModelConfig> extends Model{

    private _exists: boolean = true;
    private _isClicked: boolean = false;
    private _symbol: string;
    private _index: number

    public clickedSignal = new Signal<{index: number, state: boolean}>();
    public destroySignal = new Signal<number>();

    constructor(config: Tconfig){
        super();
        this._index = config.index;
        this._symbol = config.symbol;
    }

    public exists(){
        return this._exists;
    }

    public isClicked(){
        return this._isClicked;
    }

    public getIndex(){
        return this._index;
    }

    public getSymbol(){
        return this._symbol;
    }


    public update(data: TileData): void {
        this._isClicked = data.isClicked;
        this._exists = data.exists;
        if(this._exists){
            const data = {
                index:this._index,
                state: this._isClicked
            }
            this.clickedSignal.emit(data);
        }else{
            this.destroySignal.emit(this._index);
        }
    }


}