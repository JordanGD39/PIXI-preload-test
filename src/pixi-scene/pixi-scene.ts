import { PixiContainerItem } from "../pixi-container-item";
import { PixiSceneManager } from "./pixi-scene-manager";

export abstract class PixiScene extends PixiContainerItem {
  manager: PixiSceneManager;

  constructor(manager: PixiSceneManager) {
    super();
    this.manager = manager;
  }
}
