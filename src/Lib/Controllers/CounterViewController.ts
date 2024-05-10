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

    public getCounterViewPos(){
        return this._config.counterView.getCounterPos();
    }

    public getCounterView(){
        return this._config.counterView;
    }

    public getNumberView(){
        return this._config.counterView.getCounterNumber();
    }

    public show(){
        this._config.counterView.show();
    }
}