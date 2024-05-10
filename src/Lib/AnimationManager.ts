import { Animation, AnimationConfig } from "./Animations/Animation";
import * as PIXI from 'pixijs'
import { MoveAnimation, MoveAnimationConfig } from "./Animations/MoveAnimation";
import { TiltAnimation, TiltAnimationConfig } from "./Animations/TiltAnimation";
import { TileDestroyAnimation, TileDestroyAnimationConfig } from "./Animations/TileDestroyAnimation";
import { View, ViewConfig } from "./Views/View";
import { SlideInAnimation, SlideInAnimationConfig } from "./Animations/SlideInAnimiation";
import { PopAnimation, PopAnimationConfig } from "./Animations/PopAnimation";



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

    public playTiltAnimation(target: View<ViewConfig>, duration: number){
        const config: TiltAnimationConfig = {
            target: target,
            duration: duration
        }
        const animation = new TiltAnimation(config);
        this._addAnimation(animation);
    }

    public playTileDestoryAnimation(target: View<ViewConfig>, duration: number, counterPosition: {x: number, y: number}, onFinished?: ()=> void, scope?: Object){
        const config: TileDestroyAnimationConfig = {
            target: target,
            duration: duration,
            endPosition: counterPosition,
        }

        const animation = new TileDestroyAnimation(config);
        if(onFinished && scope){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);
    }

    public playSlideInAnimation(target: View<ViewConfig>, duration: number, onFinished?: ()=>void, scope?: Object){
        const config: SlideInAnimationConfig= {
            target: target,
            duration: duration,
            endPosition: {x:0, y:0}
        }

        const animation = new SlideInAnimation(config);
        if (scope && onFinished){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);
    }

    public playPopAnimation(target: View<ViewConfig>, duration: number, targetScale: number){
        const config: PopAnimationConfig ={
            target: target,
            duration: duration,
            targetScale: targetScale
        }

        const animation = new PopAnimation(config);
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
