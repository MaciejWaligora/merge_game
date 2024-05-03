import { Position } from "../Models/TileModel";
import { Signal } from "../Signal";
import * as PIXI from 'pixijs'

export interface InputHandlerConfig{
    renderer: PIXI.Application;
}

export class InputHandler<T extends InputHandlerConfig>{
    public tileClickedSignal = new Signal<Position>();
    private _renderer: PIXI.Application;

    constructor(config:T) {
        this._renderer = config.renderer;
        const view = config.renderer.view as HTMLCanvasElement;
        view.addEventListener('click', this.handleClick.bind(this));
    }

    private handleClick(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        const renderer = this._renderer.view as HTMLCanvasElement;
        const canvasRect = renderer.getBoundingClientRect();
    
        // Calculate the position of the click relative to the mother container
        const relativeX = offsetX - canvasRect.left;
        const relativeY = offsetY - canvasRect.top;
    
        // Calculate the size of each grid cell within the mother container
        const containerWidth = this._renderer.stage.width;
        const containerHeight = this._renderer.stage.height;
        const cellWidth = containerWidth / 4;
        const cellHeight = containerHeight / 4;
    
        // Calculate the position within the grid
        const gridX = Math.floor(relativeX / cellWidth) + 1; // Adding 1 to make it 1-indexed
        const gridY = Math.floor(relativeY / cellHeight) + 1;
    
        // Emit the grid position
        this.tileClickedSignal.emit({ x: gridX, y: gridY });
    }
}