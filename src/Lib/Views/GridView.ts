import * as PIXI from 'pixijs'
import { View, ViewConfig } from "./View";
import { TileView } from './TileView';

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

    constructor(config: GridViewConfig){
        super(config);
        this._config = config;
        this._renderer.stage.addChild(this._container);
        this._layoutGrid();
        this.centerGrid();
    }

    private _layoutGrid(){
        const tileSpacingX = 10; 
        const tileSpacingY = 10; 

        for(let i = 0; i < this._config.size; i++){
            const tile = new TileView({...this._config.tileTextures, renderer: this._config.renderer});
            const column = i % 4;
            const row = Math.floor(i / 4);
            tile.container.x = column * (tile.container.width + tileSpacingX);
            tile.container.y = row * (tile.container.height + tileSpacingY);
            this._tileViews.push(tile);
            this.addChild(tile.container);
        }
    }

    private centerGrid(){
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

       const containerWidth = this._container.width;
       const containerHeight = this._container.height;

       const containerX = (screenWidth - containerWidth)/2;
       const containerY = (screenHeight - containerHeight)/2;

       this._container.x = containerX;
       this._container.y = containerY;

    }
    public update(): void {
        
    }
}