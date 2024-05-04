import { Signal } from "../Signal";
import { Model } from "./Model";

export interface TimerModelConfig{
    timelimit: number

}

export class TimerModel<TConfig extends TimerModelConfig> extends Model{

    private _timelimit: number;
    private _currentTime: number = 0;
    public gameOverSignal = new Signal();
    private _interval!: NodeJS.Timeout;

    constructor(config: TConfig){
        super();
        this._timelimit = config.timelimit;
    }

    public start(){
        this._interval = setInterval(()=>{
            this._currentTime++
            if(this._currentTime === this._timelimit){
                this.stop();
                this.gameOverSignal.emit();
            }
        },1)
    }

    public stop(){
        clearInterval(this._interval);
    }

    update(data: any): void {
        
    }
}