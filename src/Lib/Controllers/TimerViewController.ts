import * as PIXI from 'pixijs'
import { TimerView } from '../Views/TimerView'

export interface TimerViewControllerConfig{
    timerView: TimerView
}


export class TimerViewController<Tconfig extends TimerViewControllerConfig>{

    private _config: Tconfig;

    constructor(config: Tconfig){
        this._config = config;
    }

    public setProgress(progress:number){
        this._config.timerView.setProgress(progress);
    }

    public show(){
        this._config.timerView.show();
    }

    public getTimer(){
        return this._config.timerView
    }
}