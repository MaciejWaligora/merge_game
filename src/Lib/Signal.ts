export class Signal<T>{

    private _listeners: ((data?:T)=>void) [] = [];

    public addListener(listener: (data?:T)=>void){
        this._listeners.push(listener);
    }

    public removeListener(listener: ()=>void){
        const index = this._listeners.indexOf(listener);
        this._listeners.splice(index, 1);
    }

    public emit(data?: T){
        for(const listener of this._listeners){
            if(data){
                listener(data);
            }
        }
    }

}