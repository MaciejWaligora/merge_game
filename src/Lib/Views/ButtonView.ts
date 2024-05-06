import { Signal } from "../Signal";
import { View, ViewConfig } from "./View";

import * as PIXI from 'pixijs';

export interface StartButtonViewConfig extends ViewConfig{
    buttonTexture: PIXI.Texture;
    buttonTextTexture: PIXI.Texture;
}

export class ButtonView<Tconfig extends StartButtonViewConfig> extends View<StartButtonViewConfig>{
    private _buttonSprite: PIXI.Sprite;
    private _buttonTextSprite: PIXI.Sprite;

    public clickedSignal = new Signal();

    constructor(config: Tconfig){
        super(config);
        this._buttonSprite = new PIXI.Sprite(config.buttonTexture);
        this._buttonTextSprite = new PIXI.Sprite(config.buttonTextTexture);

        this._center();
        this.addChild(this._buttonSprite);
        this.addChild(this._buttonTextSprite);        
    }

    private _center(){
        this._buttonTextSprite.y = (this._buttonSprite.height - this._buttonTextSprite.getBounds().height)/2;
        this._buttonTextSprite.x = (this._buttonSprite.width - this._buttonTextSprite.getBounds().width)/2;
    }

    public clicked(){
        this.clickedSignal.emit();
    }

    
    public update(): void {
        
    }
}