import { Signal } from "../Signal";
import { GameOverPopupView, GameOverPopupViewConfig } from "../Views/GameOverPopupView";

export interface GameOverPopupViewControllerConfig{
     gameOverPopupView: GameOverPopupView<GameOverPopupViewConfig>
}

export class GameOverPopupViewController<Tconfig extends GameOverPopupViewControllerConfig>{
    private _config: Tconfig;
    public restartButtonSignal = new Signal();

    constructor(config:Tconfig){
        this._config = config;
        config.gameOverPopupView.restartButtonSignal.addListener(this.onRestartButtonClicked, this);

    }

    public show(){
        this._config.gameOverPopupView.show();
    }

    public hide(){
        this._config.gameOverPopupView.hide();
    }

    public onRestartButtonClicked(){
        this.restartButtonSignal.emit();
    }

    public getPopup(){
        return this._config.gameOverPopupView;
    }
}