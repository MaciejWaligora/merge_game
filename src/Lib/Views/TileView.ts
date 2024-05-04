import { Signal } from "../Signal";
import { View, ViewConfig } from "./View";
import * as PIXI from 'pixijs'

export interface TileViewConfig extends ViewConfig{
    textureUnclicked: PIXI.Texture;
    textureClicked: PIXI.Texture;
    index: number;
}

export class TileView extends View<TileViewConfig>{
    private _spriteUnclicked: PIXI.Sprite;
    private _spriteClicked: PIXI.Sprite;
    private _symbolSprite!: PIXI.Sprite;
    private _myIndex: number;

    public clickSignal = new Signal<number>();

    constructor(config: TileViewConfig){
        super(config);
        this._spriteUnclicked = new PIXI.Sprite(config.textureUnclicked);
        this._spriteClicked = new PIXI.Sprite(config.textureClicked);
        this._myIndex = config.index;
        this.addChild(this._spriteUnclicked);
    }

    public select(){
        this.removeChild(this._spriteUnclicked);
        this.removeChild(this._symbolSprite);
        this.addChild(this._spriteClicked);
        this.addChild(this._symbolSprite);
    }

    public unselect(){
        this.removeChild(this._spriteClicked);
        this.removeChild(this._symbolSprite);
        this.addChild(this._spriteUnclicked);
        this.addChild(this._symbolSprite);
    }

    public click(){
        this.clickSignal.emit(this._myIndex);
    }

    public addSymbol(symbol: PIXI.Texture){
        const symbolSprite = this._symbolSprite = new PIXI.Sprite(symbol);

        const containerWidth = this.width;
        const containerHeight = this.height;

        const symbolWidth = symbolSprite.width;
        const symbolHeight = symbolSprite.height;

        symbolSprite.x = (containerHeight - symbolHeight)/2;
        symbolSprite.y = (containerWidth - symbolWidth)/2;

        this.addChild(symbolSprite)
    }


    
    public update(): void {
        
    }
}