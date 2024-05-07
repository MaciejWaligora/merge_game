import { ButtonView, ButtonViewConfig } from "../Views/ButtonView";
import { TileView } from "../Views/TileView";
import * as PIXI from 'pixijs'


export class InputHandler{

    public static attachTilesClickHandler(TileView: TileView) {
        TileView.interactive = true;
        TileView.on('pointerdown', TileView.click);
    }

    public static attachButtonClickHandler(startButton: ButtonView<ButtonViewConfig>){
        startButton.interactive = true;
        startButton.on('pointerdown', startButton.clicked);
    }
}