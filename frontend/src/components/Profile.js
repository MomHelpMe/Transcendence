import { Default } from "./Default.js";
import { ProfileInfo } from "./Profile-info.js";

export class Profile extends Default {
	mounted() {
		this.children.push(new ProfileInfo(document.querySelector("div#contents"), this.props));
	}
}