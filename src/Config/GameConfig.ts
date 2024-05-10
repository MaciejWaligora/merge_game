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
    },
    audio:{
      selectSound: string,
      unselectSound: string,
      button: string,
      success: string,
      fail: string
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
      background: './Graphics/background.png',
      tile: './Graphics/tile.png',
      clickedTile: './Graphics/clickedTile.png',
    },
    timer:{
        timelimit: 3000,
        progressBarHeight: 20,
        timerbackgroundcolor: 0xffffff,
        background:'./Graphics/timer-background.png',
        bar:'./Graphics/timer-bar.png'
    },
    counter:{
        counterHandle: './Graphics/counter-handle.png',
        counterLabel: './Graphics/counter-label.png',
        counterTile: './Graphics/counter-tile.png',
        font: './Chango-Regular.ttf'
    },
    popups:{
      backgroundtexture: './Graphics/PopupBackground.png',
      popupButtonTexture: './Graphics/PopupButton.png',
      gameOverPopupTextBackgroundTexture: './Graphics/GameOverPopUpCircle.png',
      gameOverPopupButtonText: './Graphics/GameOverPopupButtonText.png',
      gameOverPopupText: './Graphics/GameOverPopupText.png',
      startPopupTextBackgroundTexture: './Graphics/StartPopupTextBackground.png',
      startPopupButtonTextTexture:'./Graphics/StartPopupButtonText.png',
      startPopupTextTexture: './Graphics/StartPopupText.png',
      gameWonTextTexture: './Graphics/GameWonText.png',
      gameWonTextBackgroundTexture: './Graphics/GameWonPopupCircle.png',
      gameWonTimeInfoBackground: './Graphics/StartPopupTextBackground.png',
      font: './Chango-Regular.ttf'
    },
    audio:{
      selectSound:'./Audio/pop.mp3',
      unselectSound: './Audio/uselect.mp3',
      button: './Audio/button.mp3',
      success: './Audio/success.mp3',
      fail: './Audio/fail.mp3'
    }
  };