import { View, ViewConfig } from "./View";
import * as PIXI from 'pixijs'

export interface TileViewConfig extends ViewConfig{
    textureUnclicked: PIXI.Texture;
    textureClicked: PIXI.Texture;
}

export class TileView extends View<TileViewConfig>{
    private _spriteUnclicked: PIXI.Sprite;
    private _spriteClicked: PIXI.Sprite;

    constructor(config: TileViewConfig){
        super(config);
        this._spriteUnclicked = new PIXI.Sprite(config.textureUnclicked);
        this._spriteClicked = new PIXI.Sprite(config.textureClicked);
        
        this.addChild(this._spriteUnclicked);
    }

    public select(){
        this.removeChild(this._spriteUnclicked);
        this.addChild(this._spriteClicked);
    }

    public unselect(){
        this.removeChild(this._spriteClicked);
        this.addChild(this._spriteUnclicked);
    }


    
    public update(): void {
        
    }
}