import { Loader } from "./loader";
//import characterIdleJSON from "assets/gameplay/gameplay_characters/gameplay_character_island_move.json";

export class MainSceneLoader extends Loader {

  private beginUrl: string = "src/images";
  
  protected paths = {
    water1: this.beginUrl + "waterlaag1.png",
    water2: this.beginUrl + "waterlaag2.png",
    water3: this.beginUrl + "waterlaag3.png",
    water4: this.beginUrl + "waterlaag4.png",
  };

  constructor() {
    super();
  }
}
