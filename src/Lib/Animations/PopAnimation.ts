import { Animation, AnimationConfig } from "./Animation";

export interface PopAnimationConfig extends AnimationConfig{
    targetScale: number
}

export class PopAnimation<Tconfig extends PopAnimationConfig> extends Animation<PopAnimationConfig>{
    private _targetScale: number;
    private _speed: number;

    constructor(config: Tconfig){
        super(config);
        this._targetScale = config.targetScale;
        this._speed = (this._targetScale - this._target.scale.x) / config.duration * 7; 
    }

    protected _callback(delta: number): void {
        if(this._target.scale.x < this._targetScale){
            this._target.scale.set(this._target.scale.x + delta*this._speed, this._target.scale.y + delta*this._speed);
            console.log(this._target.scale.x + " Bigger")
        }else{
            this._targetScale = 1;
            console.log(this._target.scale.x + " Smaller")
            this._target.scale.set(this._target.scale.x - delta*this._speed, this._target.scale.y - delta*this._speed);
        }
    }

    protected _onAnimationFinished(): void {
        super._onAnimationFinished();
        this._target.scale.set(1,1)
    }
}