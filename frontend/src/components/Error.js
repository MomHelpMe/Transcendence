import { Default } from "./Default.js";
import { ErrorPage } from "./Error-page.js";

export class Error extends Default {
	mounted() {
		new ErrorPage(document.querySelector("div#contents"), this.props);
	}
}