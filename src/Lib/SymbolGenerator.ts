import { Symbols } from "./Symbols";

export class SymbolGenerator {
    public static generateSymbols(size: number){
        if(!(size % 2)){
            throw new Error("size of playing grid has to be even!");
        }

        const symbolsArr = [];

        for(let i = 0; i < size/2; i++){
            const index = SymbolGenerator.getRandomInt(0, Symbols.length-1);
            symbolsArr.push(Symbols[index]);
        }
        
    }

    public static getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}