import { Default } from "./Default.js";
import { Login } from "./Home-Login.js";

export class Home extends Default {

	mounted(){
		new Login(document.querySelector("div#contents"), this.props);
	}
}
