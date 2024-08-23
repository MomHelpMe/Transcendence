import { Default } from "./Default.js";
import { ProfileInfo } from "./Profile-Info.js";

export class Profile extends Default {
	mounted() {
		new ProfileInfo(document.querySelector("div#contents"), this.props);
	}
}