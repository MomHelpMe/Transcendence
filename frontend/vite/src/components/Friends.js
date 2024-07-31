import { Default } from "./Default.js";
import { FriendsInfo } from "./Friends-Info.js";

export class Friends extends Default {

	mounted(){
		this.children.push(new FriendsInfo(document.querySelector("div#contents")));
	}
}
