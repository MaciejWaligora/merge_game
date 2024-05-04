import { Signal } from "../Signal";
import { Model } from "./Model";
import {TileModel, TileModelConfig } from "./TileModel";

export interface GridModelConfig{
    symbols: string[];
}

export class GridModel<Tconfig extends GridModelConfig> extends Model{

    private _tiles: TileModel<TileModelConfig>[] = [];
    private _size: number;
    private _symbols: string[];
    private _unique: Record<string, number> = {};
    public tileClickedSignal = new Signal<{index: number, state: boolean}>();

    constructor(config: Tconfig) {
        super();
        this._size = config.symbols.length;
        this._symbols = config.symbols;
        this._initializeGrid();
        this.countUniqueSymbols();
    }

    private _initializeGrid(): void {
        for (let i= 0; i < this._size; i++) {
            const tileConfig: TileModelConfig = {
                index: i,
                symbol: this._symbols[i]
            };
            const tile = new TileModel(tileConfig);
            tile.clickedSignal.addListener(this.onTileClicked, this);
            this._tiles.push(tile);
        }
    }

    public onTileClicked(data:{index:number, state: boolean} | undefined){
        this.tileClickedSignal.emit(data);
    }

    public updateTile(index: number, exists: boolean, isClicked: boolean){
        this._tiles[index].update({exists: exists, isClicked: isClicked})
    }


    public getTileData(index: number){
        const data = {
            isClicked: this._tiles[index].isClicked(),
            exists: this._tiles[index].exists()
        }
        return data
    }

    private countUniqueSymbols(){
        this._symbols.forEach((symbol)=>{
            if(this._unique[symbol]){
                this._unique[symbol]++;
            }else{
                this._unique[symbol]=1;
            }
        })
    }

    public getUniqueSymbols(){
        return this._unique;
    }

    public update(data: any): void {
        
    }
}