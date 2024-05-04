import * as PIXI from 'pixijs'
import { View, ViewConfig } from "./View";
import { TileView } from './TileView';
import { AssetLoader } from '../AssetLoader';
import { SymbolMap } from '../Symbols';
import { Signal } from '../Signal';

export interface GridViewConfig extends ViewConfig{
    tileTextures:{
        textureClicked: PIXI.Texture;
        textureUnclicked: PIXI.Texture;
    }
    size: number;
    tileSpacing: number;
}

export class GridView extends View<GridViewConfig>{
    private _config: GridViewConfig
    private _tileViews: TileView[] = [];

    public tileClickedSignal = new Signal<number>();

    constructor(config: GridViewConfig){
        super(config);
        this._config = config;
        this._renderer.stage.addChild(this);
        this._layoutGrid();
        this.centerGrid();
    }

    private _layoutGrid(){
        const tileSpacingX = 10; 
        const tileSpacingY = 10; 

        for(let i = 0; i < this._config.size; i++){
            const tile = new TileView({...this._config.tileTextures, renderer: this._config.renderer, index: i});
            const column = i % 4;
            const row = Math.floor(i / 4);
            tile.x = column * (tile.width + tileSpacingX);
            tile.y = row * (tile.height + tileSpacingY);
            this._tileViews.push(tile);
            tile.clickSignal.addListener(this.onTileClicked, this);
            this.addChild(tile);
        }
    }

    private centerGrid(){
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

        const containerWidth = this.width;
        const containerHeight = this.height;

        const containerX = (screenWidth - containerWidth)/2;
        const containerY = (screenHeight - containerHeight)/2;

        this.x = containerX;
        this.y = containerY;
    }

    private onTileClicked(tileIndex: number|undefined){
        this.tileClickedSignal.emit(tileIndex);
    }

    
    public async addSymbols(symbols: string[]){
        const paths:string[] = [];
        symbols.forEach((symbol)=>{
            const symbolPath =  SymbolMap[symbol]
            paths.push(symbolPath);
        })
            
        const textures =  await AssetLoader.getTextures(paths);
        const tileViews = this._tileViews
        for(let i = 0; i < tileViews.length; i++){
            const symbol = textures[i]
            tileViews[i].addSymbol(symbol);
        }
    }

    public getTileViews(){
        return this._tileViews;
    }


    public update(): void {
        
    }
}