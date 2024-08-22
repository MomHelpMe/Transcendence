import { Default } from "./Default.js";
import { Error404 } from "./Error-404.js";

export class Error extends Default {
	mounted() {
		new Error404(document.querySelector("div#contents"), this.props);
	}
}