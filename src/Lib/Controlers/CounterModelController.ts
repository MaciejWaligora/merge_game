import { CounterModel } from "../Models/CounterModel";
import { Signal } from "../Signal";

export interface CounterModelControllerConfig{
    counterModel: CounterModel
}

export class CounterModelController<Tconfig extends CounterModelControllerConfig>{

    private _config: Tconfig;
    public counterChangeSignal = new Signal<number>();
    
    constructor(config: Tconfig){
        this._config = config;
        this._config.counterModel.counterChangeSingal.addListener(this.onCounterChange, this);
    }

    public increaseCount(){
        this._config.counterModel.increaseCount();
    }

    public getCount(){
        return this._config.counterModel.getCount();
    }

    public onCounterChange(val: number | undefined){
        if(val !== undefined){
            this.counterChangeSignal.emit(val);
        }
    }
}