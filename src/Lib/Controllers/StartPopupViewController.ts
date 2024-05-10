import { Signal } from "../Signal";
import { StartPopupView, StartPopupViewConfig } from "../Views/StartPopupView";

export interface StartPopupViewControllerConfig{
    startPopupView: StartPopupView<StartPopupViewConfig>
}

export class StartPopupViewController<Tconfig extends StartPopupViewControllerConfig> {
    private _config: Tconfig;
    public stratButtonClickedSignal = new Signal();

    constructor(config: Tconfig){
        this._config = config;

        config.startPopupView.startButtonClickedSignal.addListener(this.onStartButtonClicked, this);
    }

    public onStartButtonClicked(){
        this.stratButtonClickedSignal.emit();
    }

    public show(){
        this._config.startPopupView.show();
    }

    public hide(){
        this._config.startPopupView.hide();
    }

    public getPopup(){
        return this._config.startPopupView;
    }
}