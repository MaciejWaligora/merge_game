import { Model } from "./Model";

export class CounterModel extends Model{

    private _currentCount: number = 0;

    public getCount(){
        return this._currentCount;
    }
    public increaseCount(){
        this._currentCount++;
    }
    
    update(data: any): void {
        
    }
}