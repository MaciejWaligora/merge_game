import { TimerModel, TimerModelConfig } from "../Models/TimerModel";
import { Signal } from "../Signal";

export interface TimerModelControllerConfig{
    timerModel: TimerModel<TimerModelConfig>
}

export class TimerModelController<Tconfig extends TimerModelControllerConfig>{
    private _config: Tconfig
    public gameOverSignal = new Signal();
    
    constructor(config: Tconfig){
        this._config = config;
        config.timerModel.gameOverSignal.addListener(this.onGameOver, this);
    }

    public start(){
        this._config.timerModel.start();
    }

    public stop(){
        this._config.timerModel.stop();
    }

    public onGameOver(){
        this.gameOverSignal.emit();
    }
}