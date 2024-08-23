import { Default } from "./Default.js";
import { TournamentSetting } from "./Tournament-Setting.js";

export class Tournament extends Default {
	mounted() {
		new TournamentSetting(document.querySelector("div#contents"), this.props);
	}
}