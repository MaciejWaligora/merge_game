import { Model } from "./Model";
import { Signal } from "../Signal";

export interface Position{
    x: number;
    y: number;
}

export interface TileModelConfig{
    position: Position;
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
    private _position: Position;

    public clickedSignal = new Signal();
    public destroySignal = new Signal();

    constructor(config: Tconfig){
        super();
        this._position = config.position;
        this._symbol = config.symbol;
    }

    public exists(){
        return this._exists;
    }

    public isClicked(){
        return this._isClicked;
    }

    public getPosition(){
        return this._position;
    }

    public getSymbol(){
        return this._symbol;
    }


    public update(data: TileData): void {
        if ('exists' in data) {
            this._exists = data.exists;
            this.destroySignal.emit();
        }
        if ('isClicked' in data) {
            this._isClicked = data.isClicked;
            this.clickedSignal.emit();
        }
    }
}