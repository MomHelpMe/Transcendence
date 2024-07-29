import { Default } from "./Default.js";
import { Login } from "./Login.js";

export class Home extends Default {

	mounted(){
		this.children.push(new Login(document.querySelector("div#contents")));
	}
}
