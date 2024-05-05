import { Signal } from "../Signal";
import { map } from "../Utils/map";
import { Model } from "./Model";

export interface TimerModelConfig{
    timelimit: number

}

export class TimerModel<TConfig extends TimerModelConfig> extends Model{

    private _timelimit: number;
    private _currentTime: number = 0;
    public gameOverSignal = new Signal();
    public timerTickSignal = new Signal<number>();
    private _interval!: NodeJS.Timeout;

    constructor(config: TConfig){
        super();
        this._timelimit = config.timelimit;
    }

    public start(){
        this._interval = setInterval(()=>{
            this._currentTime++;
            const progress = map(this._currentTime, 0, this._timelimit, 0, 100);
            this.timerTickSignal.emit(progress);
            if(this._currentTime === this._timelimit){
                this.stop();
                this.gameOverSignal.emit();
            }
        },1)
    }

    public stop(){
        clearInterval(this._interval);
        return this._currentTime;
    }

    update(data: any): void {
        
    }
}