import * as PIXI from 'pixi.js';
import { MainSceneLoader } from './load/main-loader';
import { PixiSceneManager } from './pixi-scene/pixi-scene-manager';
import { Scenes } from './pixi-scene/scenes';
import { OtherScene } from './scene/other-scene';
import { StartScene } from "./scene/start-scene";

export class App {
    loader: MainSceneLoader;

    constructor() {
        this.loader = new MainSceneLoader();

        this.createGame();
    }

    async createGame() {
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });
        
        document.body.appendChild(app.view);

        await this.loader.load();

        new PixiSceneManager(
            app.stage,
            [
                (manager: PixiSceneManager) => new StartScene(this.loader, manager),
                (manager: PixiSceneManager) => new OtherScene(this.loader, manager)
            ],
            Scenes.startScene
          );
    }
}

new App();