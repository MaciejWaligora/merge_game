import { Model } from "./Model";
import { Position, TileData, TileModel, TileModelConfig } from "./TileModel";

export interface GridModelConfig{
    symbols: string[];
}

export class GridModel<Tconfig extends GridModelConfig> extends Model{

    private _tiles: TileModel<TileModelConfig>[] = [];
    private _size: number;
    private _symbols: string[];

    constructor(config: Tconfig) {
        super();
        this._size = config.symbols.length;
        this._symbols = config.symbols;
        this._initializeGrid();
    }

    private _initializeGrid(): void {
        let j = 0;
        for (let i= 0; i < this._size; i++) {
            if(i % 4 === 0){
                j++;
            }
            const tileConfig: TileModelConfig = {
                position: { x: i, y: j },
                symbol: this._symbols[i]
            };
            const tile = new TileModel(tileConfig);
            this._tiles.push(tile);
        }
    }


    private _getTile(position: Position): TileModel<TileModelConfig> | null{
        for(const tile of this._tiles){
            const tilePos = tile.getPosition() 
            if(tilePos.x === position.x && tilePos.y === position.y){
                return tile;
            }
        }
        return null;
    }

    public updateTile(position: Position, data: TileData){
        const tile = this._getTile(position);
        tile?.update(data);
    }

    public update(data: any): void {
        
    }
}