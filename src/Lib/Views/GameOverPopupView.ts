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

    private restartButtonSignal = new Signal();

    constructor(config: Tconfig){
        super(config)

        this._buttonContainer = new ButtonView(config);
    }


    public update(): void {
        
    }
}