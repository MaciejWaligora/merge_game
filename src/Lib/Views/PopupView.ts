import { View, ViewConfig } from "./View";
import * as PIXI from 'pixijs'

export interface PopupViewConfig extends ViewConfig{
    backgroundTexture: PIXI.Texture;
    textBackgroundTexture: PIXI.Texture;
    text: PIXI.Texture;
}

export abstract class PopupView<Tconfig extends PopupViewConfig> extends View<PopupViewConfig>{

    protected _backgroundSprite: PIXI.Sprite;
    protected _textBackgroundSprite: PIXI.Sprite;
    protected _textSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);

        this._backgroundSprite = new PIXI.Sprite(config.backgroundTexture);
        this._textBackgroundSprite = new PIXI.Sprite(config.textBackgroundTexture);
        this._textSprite = new PIXI.Sprite(config.text);
        this._backgroundSprite.alpha = 0.5;
        this.addChild(this._backgroundSprite);
        this.addChild(this._textBackgroundSprite);
        this.addChild(this._textSprite);
        this._center();
        // 
    }

    protected _center(){
        const children = this.children;
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

        for(let i = 1; i < children.length; i++){

            const currentChildWidth = children[i].getBounds().width;
            const currentChildHeight = children[i].getBounds().height;

            const targetX = (screenWidth - currentChildWidth)/2;
            const targetY = (screenHeight - currentChildHeight)/2;

            children[i].x = targetX;
            children[i].y = targetY;
        }
    }


}