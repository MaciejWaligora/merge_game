import { Signal } from "../Signal";
import { ButtonView, ButtonViewConfig } from "./ButtonView";
import { PopupView, PopupViewConfig } from "./PopupView";
import * as PIXI from 'pixijs'

export interface GameOverPopupViewConfig extends PopupViewConfig{
    buttonTexture: PIXI.Texture;
    buttonTextTexture: PIXI.Texture;
}

export class GameOverPopupView<Tconfig extends GameOverPopupViewConfig> extends PopupView<GameOverPopupViewConfig>{
    

    private _buttonContainer: ButtonView<ButtonViewConfig>;

    public restartButtonSignal = new Signal();

    constructor(config: Tconfig){
        super(config)
        this._buttonContainer = new ButtonView(config);
        this._place();
        this.addChild(this._buttonContainer);
        this._buttonContainer.clickedSignal.addListener(this.onButtonClicked, this);
    }

    private _place(){
        const prevChildY = this.children[this.children.length-1].y;
        const screenWidth = this._renderer.screen.width;

        this._buttonContainer.y = prevChildY + 320;
        this._buttonContainer.x = (screenWidth -  this._buttonContainer.width)/2; 
    }

    public onButtonClicked(){
        this.restartButtonSignal.emit();
    }

    public getButton(){
        return this._buttonContainer
    }


    public update(): void {
        
    }
}