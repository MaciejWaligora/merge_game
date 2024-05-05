import { Signal } from "../Signal";
import { Model } from "./Model";

export class CounterModel extends Model{

    private _currentCount: number = 0;

    public counterChangeSingal = new Signal<number>();

    public getCount(){
        return this._currentCount;
    }
    public increaseCount(){
        this._currentCount++;
        this.counterChangeSingal.emit(this._currentCount);
    }
    
    update(data: any): void {
        
    }
}