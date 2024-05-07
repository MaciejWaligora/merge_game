export interface AudioManagerConfig{
    selectSound: string;
    unselectSound: string;
    button: string;
    success: string;
    fail: string
}

export class AudioManager<Tconfig extends AudioManagerConfig>{
    private _selectSound: HTMLAudioElement;
    private _unselectSound: HTMLAudioElement;
    private _buttonSound: HTMLAudioElement;
    private _successSound: HTMLAudioElement;
    private _failSound: HTMLAudioElement;
    private _config: Tconfig;

    constructor(config:Tconfig){
        this._config = config;
        this._selectSound = new Audio();
        this._selectSound.src = config.selectSound;
        this._unselectSound = new Audio();
        this._unselectSound.src = config.unselectSound;
        this._buttonSound = new Audio();
        this._buttonSound.src = config.button;
        this._successSound = new Audio();
        this._successSound.src = config.success;
        this._failSound = new Audio();
        this._failSound.src = config.fail;

    }

    playSelectSound(){
        this._selectSound.pause();
        this._selectSound.currentTime = 0;
        this._selectSound.play();
    }

    playUnselectSound(){
        this._unselectSound.pause();
        this._unselectSound.currentTime = 0;
        this._unselectSound.play();
    }

    playButtonSound(){
        this._buttonSound.pause();
        this._buttonSound.currentTime = 0;
        this._buttonSound.play();
    }

    playSuccessSound(){
        this._successSound.pause();
        this._successSound.currentTime = 0;
        this._successSound.play();
    }

    playFailSound(){
        this._failSound.pause();
        this._failSound.currentTime = 0;
        this._failSound.play();
    }
}