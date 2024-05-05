import { TimerModel, TimerModelConfig } from "../Models/TimerModel";
import { Signal } from "../Signal";

export interface TimerModelControllerConfig{
    timerModel: TimerModel<TimerModelConfig>
}

export class TimerModelController<Tconfig extends TimerModelControllerConfig>{
    private _config: Tconfig
    public gameOverSignal = new Signal();
    public timerTickSignal = new Signal<number>();
    
    constructor(config: Tconfig){
        this._config = config;
        config.timerModel.gameOverSignal.addListener(this.onGameOver, this);
        config.timerModel.timerTickSignal.addListener(this.onTimerTick, this)
    }

    public start(){
        this._config.timerModel.start();
    }

    public stop(){
       return this._config.timerModel.stop();
    }

    public onGameOver(){
        this.gameOverSignal.emit();
    }

    public onTimerTick(progress: number | undefined){
        this.timerTickSignal.emit(progress);
    }
}