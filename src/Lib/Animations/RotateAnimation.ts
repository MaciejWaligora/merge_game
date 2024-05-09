import * as PIXI from 'pixijs';
import { Animation, AnimationConfig } from './Animation';

export interface RotateAnimationConfig extends AnimationConfig {
}

export class RotateAnimation<Tconfig extends RotateAnimationConfig> extends Animation<RotateAnimationConfig> {
    private _initialRotation: number;
    private _rotationSpeed: number;
    private _targetRotation: number = 1;

    constructor(config: Tconfig) {
        super(config);

        this._initialRotation = config.target.rotation;
        this._rotationSpeed =  this._targetRotation * config.duration;
        const center = new PIXI.Point(config.target.width / 2, config.target.height / 2);
        this._target.x = this._target.x + config.target.width / 2;
        this._target.y = this._target.y + config.target.height / 2

        this._target.pivot.copyFrom(center);
    }

    protected _callback(delta: number): void {
        
        this._target.rotation += this._rotationSpeed * delta;
    }

    protected _onAnimationFinished(): void {
         this._target.rotation = 0;
    }
}