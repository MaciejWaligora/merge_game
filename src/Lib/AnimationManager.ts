import { Animation, AnimationConfig } from "./Animations/Animation";
import * as PIXI from 'pixijs'
import { MoveAnimation, MoveAnimationConfig } from "./Animations/MoveAnimation";
import { RotateAnimation, RotateAnimationConfig } from "./Animations/RotateAnimation";
import { TileDestroyAnimation, TileDestroyAnimationConfig } from "./Animations/TileDestroyAnimation";
import { View, ViewConfig } from "./Views/View";



export class AnimationManager{
    private _animations: Animation<AnimationConfig>[] = []


    private _addAnimation(animation: Animation<AnimationConfig>) {
        this._animations.push(animation);
    }

    public playLinearMoveAnimation(target: View<ViewConfig>, duration: number, endPosition: {x: number, y: number}){
        const config: MoveAnimationConfig = {
            target: target,
            duration: duration,
            endPosition: endPosition,
            easingFunction: (progress)=> progress
        }
        const animation  = new MoveAnimation(config);
        this._addAnimation(animation);
    }

    public playLinearFullRotationAnimation(target: View<ViewConfig>, duration: number){
        const config: RotateAnimationConfig = {
            target: target,
            duration: duration
        }
        const animation = new RotateAnimation(config);
        this._addAnimation(animation);
    }

    public playTileDestoryAnimation(target: View<ViewConfig>, duration: number, counterPosition: {x: number, y: number}){
        const config: TileDestroyAnimationConfig = {
            target: target,
            duration: duration,
            endPosition: counterPosition
        }

        const animation = new TileDestroyAnimation(config);
        this._addAnimation(animation);
    }

    public flushFinishedAnimations(){
        this._animations = this._animations.filter(animation => !animation.isFinished());
    }


    public update(delta: number) {
        this._animations.forEach(animation => {
            animation.update(delta);
        });
    }
}
