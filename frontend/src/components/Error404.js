import { Default } from "./Default.js";
import { Error404Page } from "./Error404-page.js";

export class Error404 extends Default {
	mounted() {
		new Error404Page(document.querySelector("div#contents"), this.props);
	}
}