import { PopupModel } from "./PopupModel";

export class GameOverPopupModel extends PopupModel{

    public hide(){
        this.isHidden = false;
        this.hideSignal.emit();
    }

    public show(){
        this.isHidden = true;
        this.showSignal.emit();
    }
    
    update(data: any): void {
        
    }
}