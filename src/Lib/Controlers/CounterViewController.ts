import { CounterView } from "../Views/CounterView";

export interface CounterViewControllerConfig{
    counterView: CounterView;
}


export class CounterViewController<Tconfig extends CounterViewControllerConfig>{
    private _config: Tconfig;
    constructor(config: Tconfig){
        this._config = config;
    }
    public setCounterDisplay(value: number | undefined){
        if(value !== undefined){
            this._config.counterView.setCounterDisplay(value);
        } 
    }
}