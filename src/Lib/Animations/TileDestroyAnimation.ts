import { MoveAnimation, MoveAnimationConfig } from "./MoveAnimation";

export interface TileDestroyAnimationConfig extends MoveAnimationConfig{

}

export class TileDestroyAnimation<Tconfig extends TileDestroyAnimationConfig> extends MoveAnimation<TileDestroyAnimationConfig>{
    private _scaleDelta: number;
    constructor (config: Tconfig){
        config.easingFunction = (progress: number): number => {
            return 1 - Math.pow(1 - progress, 2);
        }
        super(config);
        this._scaleDelta = 1 / this._duration;
    }

    protected _callback(delta: number): void {
        super._callback(delta);
        this._target.scale._x -= this._scaleDelta*delta;
        this._target.scale._y -= this._scaleDelta*delta;
        this._target.alpha -= this._scaleDelta*delta;
    }

    protected _onAnimationFinished(): void {
        this._target.hide();
    }

}