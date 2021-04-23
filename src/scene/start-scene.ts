import { Loader } from "../load/loader";
import { PixiScene } from "../pixi-scene/pixi-scene";
import { PixiSceneManager } from "../pixi-scene/pixi-scene-manager";
import * as PIXI from 'pixi.js';
import { Scenes } from "../pixi-scene/scenes";

export class StartScene extends PixiScene {

    constructor(mainLoader: Loader, manager: PixiSceneManager) {
        super(manager);

        const sprite = new PIXI.Sprite(mainLoader.loader.resources["water1"].texture);

        this._container.addChild(sprite);
        console.log(sprite);

        this.loadNextScene(manager);
    }

    async loadNextScene(manager: PixiSceneManager) {
        await this.delay(3000);

        manager.goTo(Scenes.testScene);
    }

    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}