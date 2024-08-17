import { Default } from "./Default.js";
import { FriendsList } from "./Friends-List.js";

export class Friends extends Default {

	mounted(){
		new FriendsList(document.querySelector("div#contents"));
	}
}
