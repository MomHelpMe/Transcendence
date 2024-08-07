import { Default } from "./Default.js";
import { Menu } from "./Main-Menu.js";

export class Main extends Default {
	mounted(){
		this.children.push(new Menu(document.querySelector("div#contents")));
	}
}