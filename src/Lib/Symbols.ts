type SymbolMapType = {
    [key: string]: string;
};

export const SymbolMap: SymbolMapType = {
    diamond: "./diamond.png",
    circle: "./circle.png",
    triangle: "./triangle.png",
    square: "./square.png",
    star: "./star.png",
    heart: "./heart.png"
}

export const Symbols = Object.keys(SymbolMap)