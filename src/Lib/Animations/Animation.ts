import * as PIXI from 'pixijs'
import { View, ViewConfig } from '../Views/View';

export type AnimationCallback = (delta: number) => void;

export interface AnimationConfig{
    duration: number;
    easingFunction?: (progress: number) => number;
    target: View<ViewConfig>;
}

export class Animation<Tconfig extends AnimationConfig>{

    protected _duration: number;
    protected  _easingFunction: (progress: number) => number;
    protected  _target: View<ViewConfig>;
    protected  _elapsed: number;
    protected  _finished: boolean;

    constructor(config: Tconfig){
        this._duration = config.duration;
        this._easingFunction = config.easingFunction ? config.easingFunction : (progress) => progress;
        this._target = config.target;
        this._elapsed = 0;
        this._finished = false;
    }

    public update(delta: number) {
        if (!this._finished) {
            this._elapsed += delta;
            const progress = Math.min(this._elapsed / this._duration, 1);
            const easedProgress = this._easingFunction(progress);

            this._callback(easedProgress);

            if (progress >= 1) {
                this._onAnimationFinished();
                this._finished = true;
            }
        }
    }

    protected _callback(delta: number): void{

    }

    protected _onAnimationFinished(): void{}


    isFinished(): boolean {
        return this._finished;
    }
}