import { Signal } from "../Signal";
import { ButtonView, ButtonViewConfig } from "./ButtonView";
import { PopupView, PopupViewConfig } from "./PopupView";
import * as PIXI from 'pixijs'

export interface GameWonPopupViewConfig extends PopupViewConfig{
    timeInfoBackground: PIXI.Texture;
    buttonTexture: PIXI.Texture;
    buttonTextTexture: PIXI.Texture;
    font: string
}

export class GameWonPopupView<Tconfig extends GameWonPopupViewConfig> extends PopupView<GameWonPopupViewConfig>{

    private _timeInfoBackground: PIXI.Sprite;
    private _timeDisplay: PIXI.Text;
    private _timeInfoContainer: PIXI.Container;
    private _buttonContainer: ButtonView<ButtonViewConfig>;

    public restartButtonSignal = new Signal();

    constructor(config: Tconfig){
        super(config);
        this._timeInfoBackground = new PIXI.Sprite(config.timeInfoBackground);
        const style = new PIXI.TextStyle({
            fontFamily: config.font,
            fontSize: 45,
            fontWeight: 'lighter'
        })
        this._timeDisplay = new PIXI.Text('', style);

        this._timeInfoContainer = new PIXI.Container();

        this._timeInfoContainer.addChild(this._timeInfoBackground);
        this._timeInfoContainer.addChild(this._timeDisplay);
        this.addChild(this._timeInfoContainer);
        this._place();
        this._buttonContainer = new ButtonView(config);
        this.addChild(this._buttonContainer);
        this._placeButton();
        this._adjustTextDisplay()
        this._buttonContainer.clickedSignal.addListener(this.onButtonClicked, this);
        
    }

    private _place(){
        const prevChildY = this.children[this.children.length-2].y;
        const screenWidth = this._renderer.screen.width;

        this._timeInfoContainer.y = prevChildY + 320;
        this._timeInfoContainer.x = (screenWidth -  this._timeInfoContainer.width)/2;
       
    }

    private _adjustTextDisplay(){
        const containerWidth = this._timeInfoBackground.width;
        const containerHeight = this._timeInfoContainer.height;


        this._timeDisplay.x = (containerWidth - this._timeDisplay.width)/2;
        this._timeDisplay.y = (containerHeight - this._timeDisplay.height)/2;
    }


    private _placeButton(){
        const screenWidth = this._renderer.screen.width;

        this._buttonContainer.y = this._timeInfoContainer.y + 320;
        this._buttonContainer.x = (screenWidth -  this._buttonContainer.width)/2; 
    }

    public onButtonClicked(){
        this.restartButtonSignal.emit();
    }

    public getButton(){
        return this._buttonContainer
    }

    public update(data?: number): void {
        this._timeDisplay.text = `Your time is: ${data}s`

        this._adjustTextDisplay()
    }
}