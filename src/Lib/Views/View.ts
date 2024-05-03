import * as PIXI from "pixijs";

export interface ViewConfig{
    renderer: PIXI.Application;
}


export abstract class View<Tconfig extends ViewConfig> {
    protected _container: PIXI.Container;
    protected _renderer: PIXI.Application;

    constructor(config: Tconfig) {
        this._container = new PIXI.Container();
        this._renderer = config.renderer;
    }

    public addChild(child: PIXI.DisplayObject): void {
        this._container.addChild(child);
    }

    public removeChild(child: PIXI.DisplayObject): void {
        this._container.removeChild(child);
    }

    public show(){
        const container = this._container;
        this._renderer.stage.addChild(container);
    }

    public hide(){
        const container = this._container;
        this._renderer.stage.removeChild(container);
    }

    public abstract update(): void;


    public get container(): PIXI.Container {
        return this._container;
    }
}