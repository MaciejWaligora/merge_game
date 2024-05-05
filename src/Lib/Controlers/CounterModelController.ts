import { CounterModel } from "../Models/CounterModel";

export interface CounterModelControllerConfig{
    counterModel: CounterModel
}

export class CounterModelController<Tconfig extends CounterModelControllerConfig>{

    private _config: Tconfig;
    
    constructor(config: Tconfig){
        this._config = config;
    }

    public increaseCount(){
        this._config.counterModel.increaseCount();
    }

    public getCount(){
        return this._config.counterModel.getCount();
    }
}