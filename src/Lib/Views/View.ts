import * as PIXI from "pixijs";

export interface ViewConfig{
    renderer: PIXI.Application;
}


export abstract class View<Tconfig extends ViewConfig> extends PIXI.Container{
    protected _renderer: PIXI.Application;

    constructor(config: Tconfig) {
        super();
        this._renderer = config.renderer;
    }


    public show(){
        this._renderer.stage.addChild(this);
    }

    public hide(){
        this._renderer.stage.removeChild(this);
    }


    public abstract update(): void;
}