export interface GameConfig {
    display: {
      width: number;
      height: number;
      autoResize: boolean;
      resolution: number;
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
    },
    popups:{
      backgroundtexture: string,
      popupButtonTexture: string,
      gameOverPopupTextBackgroundTexture: string,
      gameOverPopupButtonText: string,
      gameOverPopupText: string,
      startPopupTextBackgroundTexture: string,
      startPopupButtonTextTexture:string,
      startPopupTextTexture: string,
      gameWonTextTexture: string,
      gameWonTextBackgroundTexture:string,
      gameWonTimeInfoBackground:string,
      font:string
    }
  }

export const config: GameConfig = {
    display: {
      width: 1080,
      height: 1920,
      autoResize: true,
      resolution: window.devicePixelRatio
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
        timelimit: 3000,
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
    },
    popups:{
      backgroundtexture: './PopupBackground.png',
      popupButtonTexture: './PopupButton.png',
      gameOverPopupTextBackgroundTexture: './GameOverPopUpCircle.png',
      gameOverPopupButtonText: './GameOverPopupButtonText.png',
      gameOverPopupText: './GameOverPopupText.png',
      startPopupTextBackgroundTexture: './StartPopupTextBackground.png',
      startPopupButtonTextTexture:'./StartPopupButtonText.png',
      startPopupTextTexture: './StartPopupText.png',
      gameWonTextTexture: './GameWonText.png',
      gameWonTextBackgroundTexture: './GameWonPopupCircle.png',
      gameWonTimeInfoBackground: './StartPopupTextBackground.png',
      font: './Chango-Regular.ttf'
    }
  };