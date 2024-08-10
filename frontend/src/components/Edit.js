import { Default } from "./Default.js";
import { EditProfile } from "./Edit-Profile.js";

export class Edit extends Default {
	mounted() {
		this.children.push(new EditProfile(document.querySelector("div#contents"), this.props));
	}
}