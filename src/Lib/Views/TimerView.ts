import * as PIXI from "pixijs";
import { View, ViewConfig } from "./View";

export interface TimerViewConfig extends ViewConfig {
    backgroundColor: number;
    height: number;
}

export class TimerView extends View<TimerViewConfig> {
    private _backgroundColor: number;
    private _background!: PIXI.Sprite;
    private _progressBar!: PIXI.Sprite;
    private _progressWidth: number;
    private _config: TimerViewConfig

    constructor(config: TimerViewConfig) {
        super(config);
        this._config = config;
        this._backgroundColor = config.backgroundColor;
        this._progressWidth = 0; // Initialize progress width with full width
        this.createBackground();
        this.createProgressBar();
    }

    private createBackground(): void {
        const background = new PIXI.Graphics();
        background.beginFill(this._backgroundColor);
        background.drawRect(0, 0, 0, this._config.height);
        background.endFill();
        const backgroundTexture = this._renderer.renderer.generateTexture(background);
        this._background = new PIXI.Sprite(backgroundTexture);

        this.addChild(this._background);
    }

    private createProgressBar(): void {
        const progressBar = new PIXI.Graphics();
        progressBar.beginFill(0xff0000); // Color of the progress bar
        progressBar.drawRect(0, 0, this._progressWidth, this._config.height); // Set the width and height of the progress bar
        progressBar.endFill();
        const progressBarTexture = this._renderer.renderer.generateTexture(progressBar);
        this._progressBar = new PIXI.Sprite(progressBarTexture);
        this.addChild(this._progressBar); // Add the progress bar to the TimerView container
    }

    public setProgress(progress: number): void {
        
    }

    public update(): void {
        // Implement update logic if needed
    }

    public show(): void {
        super.show();
        // Get the stage and its children
        const stage = this._renderer.stage;
        const children = stage.children;

        // Determine the position of the last child on the stage
        let lastChild = children[children.length - 2]
        let yPos = lastChild.y + lastChild.getLocalBounds().height;
        this._width = lastChild.getLocalBounds().width;
        this._background.width = lastChild.getLocalBounds().width;
        // Position the TimerView underneath the last child
        this.position.set(0, yPos);
    }
}