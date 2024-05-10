import * as PIXI from "pixijs";
import { View, ViewConfig } from "./View";
import { GridView } from "./GridView";
import { map } from "../Utils/map";

export interface TimerViewConfig extends ViewConfig {
    background: PIXI.Texture;
    progressBar: PIXI.Texture;
}

export class TimerView extends View<TimerViewConfig> {

    private _backgroundSprite: PIXI.Sprite;
    private _progressBarSprite: PIXI.Sprite;

    constructor(config: TimerViewConfig) {
        super(config);
        this._backgroundSprite = new PIXI.Sprite(config.background);
        this._progressBarSprite = new PIXI.Sprite(config.progressBar);
        this.addBackground();
        this.addProgressBar();
        this.place(); 
    }

    private place(){

        //center on x axis
        const screenWidth = this._renderer.screen.width;
        const containerWidth = this.width;
        const containerX = (screenWidth - containerWidth)/2;
        this.x = containerX;

        //place under Gird
        const stage = this._renderer.stage;
        let gridViewY: number;
        let gridViewHeight: number

        for(let child of stage.children){
            if(child instanceof GridView){
                gridViewY = child.y;
                gridViewHeight = child.height;
                this.y = gridViewY + gridViewHeight + 20
            }
        }

        
    }

    private addBackground(): void {
        this.addChild(this._backgroundSprite);
    }

    private addProgressBar(): void {
        this._progressBarSprite.width = 0;
        this.addChild(this._progressBarSprite);
    }

    public setProgress(progress: number): void {
        //assuming progress is 0% - 100%
        const max = this.width;
        //map values:
        

        const progressWidth = map(progress, 0, 100, 0, max);

        this._progressBarSprite.width = progressWidth;
    }

    public show(): void {
        super.show();
        this.place(); 
    }

    public update(): void {

    }
}