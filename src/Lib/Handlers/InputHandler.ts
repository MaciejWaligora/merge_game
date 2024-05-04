import { TileView } from "../Views/TileView";



export class InputHandler{

    public attachTilesClickHandler(TileView: TileView) {
        TileView.interactive = true;
        TileView.on('click', TileView.click);
    }
}