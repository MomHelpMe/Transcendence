import { Default } from "./Default.js";
import { WaitForMatch } from "./Match-Wait.js";

export class Match extends Default {
	mounted() {
		new WaitForMatch(document.querySelector("div#contents"), this.props);
	}
}