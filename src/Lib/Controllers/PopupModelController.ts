import { PopupModel } from "../Models/PopupModel";
import { Signal } from "../Signal";

export interface PopupModelControllerConfig{
    popupModel: PopupModel
}

export abstract class PopupModelController<Tconfig extends PopupModelControllerConfig>{
    protected _config: Tconfig;
    public openSignal = new Signal();
    public closeSignal = new Signal();
    
    constructor(config: Tconfig){
        this._config = config;
        config.popupModel.hideSignal.addListener(this.onHidden, this);
        config.popupModel.showSignal.addListener(this.onOpen, this);
    }

    public show(){
        this._config.popupModel.show();
    }

    public hide(){
        this._config.popupModel.hide();
    }

    public onHidden(){
        this.closeSignal.emit();
    }

    public onOpen(){
        this.openSignal.emit();
    }
}