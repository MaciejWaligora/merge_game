import { ButtonView, StartButtonViewConfig } from "../Views/ButtonView";
import { TileView } from "../Views/TileView";
import * as PIXI from 'pixijs'


export class InputHandler{

    public attachTilesClickHandler(TileView: TileView) {
        TileView.interactive = true;
        TileView.on('pointerdown', TileView.click);
    }

    public attachStartButtonClickHandler(startButton: ButtonView<StartButtonViewConfig>){
        startButton.interactive = true;
        startButton.on('pointerdown', startButton.clicked);
    }
}