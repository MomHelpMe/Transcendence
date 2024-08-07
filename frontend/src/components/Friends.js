import { Default } from "./Default.js";
import { FriendsList } from "./Friends-List.js";

export class Friends extends Default {

	mounted(){
		this.children.push(new FriendsList(document.querySelector("div#contents")));
	}
}
