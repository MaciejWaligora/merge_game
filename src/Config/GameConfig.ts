export interface GameConfig {
    display: {
      width: number;
      height: number;
    };
    grid: {
      size: number;
      tilespacing: number;
    };
    assets: {
      background: string;
      tile: string;
      clickedTile: string;
    };
    timer:{
        timelimit: number;
        progressBarHeight: number;
        timerbackgroundcolor: number;
        background: string,
        bar:string
    },
    counter:{
        counterHandle: string;
        counterLabel: string;
        counterTile: string;
        font: string;
    }
  }

export const config: GameConfig = {
    display: {
      width: 1080,
      height: 1920,
    },
    grid: {
      size: 16,
      tilespacing: 10,
    },
    assets: {
      background: './background.png',
      tile: './tile.png',
      clickedTile: './clickedTile.png',
    },
    timer:{
        timelimit: 6000,
        progressBarHeight: 20,
        timerbackgroundcolor: 0xffffff,
        background:'./timer-background.png',
        bar:'./timer-bar.png'
    },
    counter:{
        counterHandle: './counter-handle.png',
        counterLabel: './counter-label.png',
        counterTile: './counter-tile.png',
        font: './Chango-Regular.ttf'
    }
  };