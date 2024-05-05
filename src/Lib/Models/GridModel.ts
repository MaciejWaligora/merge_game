import { Signal } from "../Signal";
import { TileView } from "../Views/TileView";
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
    private _currentSelection: TileModel<TileModelConfig>[] = [];
    public tileClickedSignal = new Signal<{index: number, state: boolean}>();
    public tileDestroyedSignal = new Signal<number>();

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
            tile.destroySignal.addListener(this.onTileDestroyed, this);
            this._tiles.push(tile);
        }
    }

    public onTileClicked(data:{index:number, state: boolean} | undefined){
        this.tileClickedSignal.emit(data);
    }

    public onTileDestroyed(index: number | undefined){
        this.tileDestroyedSignal.emit(index);
    }

    public updateTile(index: number, exists: boolean, isClicked: boolean){
        this._tiles[index].update({exists: exists, isClicked: isClicked})
    }

    public addSelection(index:number){
        const tileModel = this._tiles[index];
        this._currentSelection.push(tileModel);
    }

    public removeSelection(index:number){
        const tile = this._tiles[index]
        const indexInSelection = this._currentSelection.indexOf(tile);
        this._currentSelection.splice(indexInSelection,1);
    }

    public getCurrentSelection(){
        return this._currentSelection;
    }
    public getTileData(index: number){
        const data = {
            isClicked: this._tiles[index].isClicked(),
            exists: this._tiles[index].exists(),
            symbol: this._tiles[index].getSymbol()
        }
        return data
    }

    public unExist(index: number | undefined){
        if(index !== undefined){
            this._tiles[index].update({exists: false, isClicked: false})
        }
    }

    public clearSelection(){
        const currentSelection = this._currentSelection;
        for(let i = 0; i < currentSelection.length ; i++){
            const tile = currentSelection[i]
            const index = this._tiles.indexOf(tile);
           this._tiles[index].update({exists: false, isClicked: true})
        }
        this._currentSelection = [];
    }

    public getTiles(){
        return this._tiles;
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