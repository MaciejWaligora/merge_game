import { Signal } from "../Signal";
import { GameWonPopupView, GameWonPopupViewConfig } from "../Views/GameWonPopupView";

export interface GameWonPopupViewControllerConfig{
    gameWonPopupView: GameWonPopupView<GameWonPopupViewConfig>;
}

export class GameWonPopupViewController<Tconfig extends GameWonPopupViewControllerConfig>{

    private _config: Tconfig;

    public restartButtonSignal = new Signal();
    constructor(config: Tconfig){
        this._config = config;
        this.hide();
        this._config.gameWonPopupView.restartButtonSignal.addListener(this.onRestartButtonClicked, this);
    }
    public show(){
        this._config.gameWonPopupView.show();
    }

    public hide(){
        this._config.gameWonPopupView.hide();
    }

    public update(data: number){
        this._config.gameWonPopupView.update(data);
    }

    public onRestartButtonClicked(){
        this.restartButtonSignal.emit();
    }

}