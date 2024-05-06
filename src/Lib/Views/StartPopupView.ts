import { Signal } from "../Signal";
import { ButtonView, StartButtonViewConfig } from "./ButtonView";
import { PopupView, PopupViewConfig } from "./PopupView";
import * as PIXI from 'pixijs'

export interface StartPopupViewConfig extends PopupViewConfig{
    buttonTexture: PIXI.Texture;
    buttonTextTexture: PIXI.Texture;
}

export class StartPopupView<Tconfig extends StartPopupViewConfig> extends PopupView<StartPopupViewConfig>{

    
    private _buttonContainer: ButtonView<StartButtonViewConfig>;

    public startButtonClickedSignal = new Signal();


    constructor(config: Tconfig){
        super(config);

        this._buttonContainer = new ButtonView(config);
        this._place();
        this.addChild(this._buttonContainer);
        this._buttonContainer.clickedSignal.addListener(this.onButtonClicked, this);
        
    }

    private _place(){
        const prevChildY = this.children[this.children.length-1].y;
        const screenWidth = this._renderer.screen.width;

        this._buttonContainer.y = prevChildY + 120;
        this._buttonContainer.x = (screenWidth -  this._buttonContainer.width)/2;

       
    }

    public getButtonAndFunctionality(){
        return this._buttonContainer
    }

    public onButtonClicked(){
        console.log('startClicked')
        this.startButtonClickedSignal.emit();
    }

    public update(): void {
        
    }
}