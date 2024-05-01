export class Signal {

    private _listeners: (()=>void) [] = [];

    public addListener(listener: ()=>void){
        this._listeners.push(listener);
    }

    public removeListener(listener: ()=>void){
        const index = this._listeners.indexOf(listener);
        this._listeners.splice(index, 1);
    }

    public emit(){
        for(const listener of this._listeners){
            listener();
        }
    }

}