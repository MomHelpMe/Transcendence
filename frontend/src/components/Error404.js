import { Default } from "./Default.js";
import { Error404 } from "./Error404-page.js";

export class Error extends Default {
	mounted() {
		new Error404(document.querySelector("div#contents"), this.props);
	}
}