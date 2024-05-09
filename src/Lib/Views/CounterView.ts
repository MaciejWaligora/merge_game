import { GridView } from "./GridView";
import { View, ViewConfig } from "./View";
import * as PIXI from 'pixijs'

export interface CounterViewConfig extends ViewConfig{
    counterHandle : PIXI.Texture;
    counterLabel: PIXI.Texture;
    counterTile: PIXI.Texture;
    counterFont: string
}

export class CounterView extends View<CounterViewConfig>{
    private _counterHandleSprite: PIXI.Sprite;
    private _counterLabelSprite: PIXI.Sprite;
    private _counterTileSprite: PIXI.Sprite;
    private _counterDisplay: PIXI.Text;


    constructor(config: CounterViewConfig){
        super(config);
        const style = new PIXI.TextStyle({
            fontFamily: config.counterFont,
            fontSize: 45,
            fontWeight: 'lighter'
        })
        this._counterHandleSprite = new PIXI.Sprite(config.counterHandle);
        this._counterLabelSprite = new PIXI.Sprite(config.counterLabel);
        this._counterTileSprite = new PIXI.Sprite(config.counterTile);
        this._counterDisplay = new PIXI.Text('0', style);
        this.addChild(this._counterHandleSprite);
        this.addChild(this._counterLabelSprite);
        this.addChild(this._counterTileSprite);
        this.addChild(this._counterDisplay);
        this._placeChildrenRelatively();
        this._placeAboveGrid();
    }

    private _placeChildrenRelatively(){
        const children = this.children;
        for(let i = 1; i < children.length; i++){
            if(children[i] instanceof PIXI.Text){
                children[i].x = children[i-1].x + (children[i-1].getBounds().width - children[i].getBounds().width)/2;
            }else{
                children[i].x = children[i-1].getBounds().width + children[i-1].getBounds().x + 20;
            }
        }

        const containerHeight = this.height;
        for(let child of children){
            const y = (containerHeight - child.getBounds().height)/2;
            child.y = y;
        }
    }

    private _placeAboveGrid(){
        const stage = this._renderer.stage;
        let gridViewY: number;
        let gridViewX: number;
        for(let child of stage.children){
            if(child instanceof GridView){
                gridViewY = child.y;
                gridViewX = child.x;
                this.y = gridViewY - this.height - 40;
                this.x = gridViewX;
            }
        }
    }

    public setCounterDisplay(val: number){
        this._counterDisplay.text = val.toString();
        if(val >= 10){
            this._adjustCounterDisplay();
        }
    }

    private _adjustCounterDisplay(){
        const children = this.children;
        for(let i = 1; i < children.length; i++){
            if(children[i] instanceof PIXI.Text){
                const previous  = children[i-1] as PIXI.Sprite;
                previous.width = children[i].getBounds().width +10;
                children[i].x = children[i-1].x + (children[i-1].getBounds().width - children[i].getBounds().width)/2;
            }
        }
    }

    public getCounterPos(){
        return {x: this._counterTileSprite.x + this._counterTileSprite.width/2, y: this._counterTileSprite.y - this._counterTileSprite.height}
    }


    public update(): void {
        
    }
}