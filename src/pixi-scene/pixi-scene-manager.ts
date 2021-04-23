import * as PIXI from "pixi.js";
import { PixiScene } from "./pixi-scene";
import { Scenes } from "./scenes";

export class PixiSceneManager {
  stage: PIXI.Container;
  scenes: Array<(manager: PixiSceneManager) => PixiScene>;
  currentScene!: PixiScene;
  currentSceneIndex: number;
  previousSceneIndex: number;
  private _loadingScene: boolean = false;

  constructor(stage: PIXI.Container, scenes: Array<(manager: PixiSceneManager) => PixiScene>, startSceneIndex = 0) {
    if (scenes.length === 0) throw Error("PixiSceneManager: implement at least 1 scene");
    this.stage = stage;
    this.scenes = scenes;
    this.currentSceneIndex = startSceneIndex;
    this.previousSceneIndex = this.currentSceneIndex;
    this.loadFirstScene();
  }

  private async loadFirstScene() {
    this.currentScene = await this.scenes[this.currentSceneIndex](this);
    this.stage.addChild(this.currentScene.container);
  }

  async next() {
    this.previousSceneIndex = this.currentSceneIndex;
    const next = this.currentSceneIndex + 1;
    if (next > this.scenes.length - 1) return;
    const nextScene = await this.scenes[next](this);
    this.currentScene.destroy();
    this.currentScene = nextScene;
    this.currentSceneIndex = next;
    this.stage.addChild(this.currentScene.container);
  }

  async goTo(name: Scenes) {

    this.previousSceneIndex = this.currentSceneIndex;
    const goTo = name;
    if (goTo > this.scenes.length - 1 || goTo < 0 || this._loadingScene) return;
    this._loadingScene = true;

    const nextScene = await this.scenes[goTo](this);
    this.currentScene.destroy();
    this.currentScene = nextScene;

    this.currentSceneIndex = goTo;
    this.stage.addChild(this.currentScene.container);
    this._loadingScene = false;
  }


  async restart() {
    const previous = this.currentSceneIndex;
    const nextScene = await this.scenes[previous](this);
    this.currentScene.destroy();
    this.currentScene = nextScene;
    this.currentSceneIndex = previous;
    this.stage.addChild(this.currentScene.container);
  }

  async previous() {
    this.previousSceneIndex = this.currentSceneIndex;
    const previous = this.currentSceneIndex - 1;
    if (previous < 0) return;
    const nextScene = await this.scenes[previous](this);
    this.currentScene.destroy();
    this.currentScene = nextScene;
    this.currentSceneIndex = previous;
    this.stage.addChild(this.currentScene.container);
  }

  smootTransitionScene() {}
}
