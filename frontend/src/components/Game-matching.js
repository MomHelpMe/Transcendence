import { GameDefault } from "./Game-Default.js";
import { GameCore } from "./Game-Core.js";

export class GameMatching extends GameDefault {
	mounted(){
		new GameCore(document.querySelector("div#game"), this.props);
	}
}