import * as PIXI from "pixi.js";

export abstract class Loader {
  public loader: PIXI.Loader;
  protected abstract paths: Object;
  public resources: Map<string, any>;

  constructor() {
    this.loader = new PIXI.Loader();
    this.resources = new Map();
  }

  public async load(): Promise<void> {
    await Object.entries(this.paths).forEach((val) => {
      this.loader.add(val[0], val[1] as string);
    });

    return new Promise((resolve, reject) => {
      this.loader.load(function () {
        resolve();
      });
    });
  }
}
