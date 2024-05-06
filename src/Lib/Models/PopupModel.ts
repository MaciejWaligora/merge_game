import { Signal } from "../Signal";
import { Model } from "./Model";

export abstract class PopupModel extends Model{

    protected isHidden: boolean = false;

    public hideSignal = new Signal();
    public showSignal = new Signal();

    public hide(){
        this.isHidden = false;
        this.hideSignal.emit();
    }

    public show(){
        this.isHidden = true;
        this.showSignal.emit();
    }
    
}