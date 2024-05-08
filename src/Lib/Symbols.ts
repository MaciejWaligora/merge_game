type SymbolMapType = {
    [key: string]: string;
};

export const SymbolMap: SymbolMapType = {
    diamond: "./Graphics/diamond.png",
    circle: "./Graphics/circle.png",
    triangle: "./Graphics/triangle.png",
    square: "./Graphics/square.png",
    star: "./Graphics/star.png",
    heart: "./Graphics/heart.png"
}

export const Symbols = Object.keys(SymbolMap)