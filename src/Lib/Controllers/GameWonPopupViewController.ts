import { GameWonPopupView, GameWonPopupViewConfig } from "../Views/GameWonPopupView";

export interface GameWonPopupViewControllerConfig{
    gameWonPopupView: GameWonPopupView<GameWonPopupViewConfig>;
}

export class GameWonPopupViewController<Tconfig extends GameWonPopupViewControllerConfig>{

    private _config: Tconfig;
    constructor(config: Tconfig){
        this._config = config;
        this.hide();
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


}