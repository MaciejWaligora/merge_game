import { Component, ReactNode, createRef } from "react";
import * as PIXI from "pixijs"

export interface GameConfig{
    width: number;
    height: number;
}

export class GameCanvas <TConfig extends GameConfig> extends Component{

    private _parentRef = createRef<HTMLDivElement>();
    private _pixiApp!: PIXI.Application;

    constructor(config: TConfig){
        super(config);

        this._pixiApp = new PIXI.Application({
            width: config.width,
            height: config.height
        });
        
    }

    public componentDidMount(): void {
        this._loadView();
    }

    private _loadView(){
        this._parentRef.current?.appendChild(this._pixiApp.view as HTMLCanvasElement);
    }

    public render(): ReactNode{
        return <div ref={this._parentRef}></div>
    }
}