import { Default } from "./Default.js";
import { EditProfile } from "./Edit-Profile.js";

export class Edit extends Default {
	mounted() {
		new EditProfile(document.querySelector("div#contents"), this.props);
	}
}