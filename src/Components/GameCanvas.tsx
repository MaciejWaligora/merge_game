import { Component, ReactNode, createRef } from "react";
import * as PIXI from "pixijs"

import { SymbolGenerator } from "../Lib/SymbolGenerator";

SymbolGenerator.generateSumbols();

export interface GameConfig{
    pixiApp: PIXI.Application;
}

export class GameCanvas extends Component <GameConfig> {

    private _parentRef = createRef<HTMLDivElement>();


    public componentDidMount(): void {
        this._loadView();
    }

    public componentWillUnmount(): void {
        this.props.pixiApp.destroy();
    }

    private _loadView(){
        if (this._parentRef.current) {
            this._parentRef.current.appendChild(this.props.pixiApp.view as HTMLCanvasElement);
        }
    }

    public render(): ReactNode{
        return <div ref={this._parentRef}></div>
    }
}