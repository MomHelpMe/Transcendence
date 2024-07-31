import { Component } from "../core/Component.js";

export class FriendsInfo extends Component {

  template () {
    return `
		<div id="friendsBox">
			<div id="friendsWindow">
				<div id="friendsMenu">
					<p id="friendsMenu">Friends List</p>
				</div>
				<div id="friendsList">
				</div>
				<div id="friendsEdit">
					<div class="friendsEdit" id="addFriend">Add</div>
					<div class="friendsEdit" id="removeFriend">Remove</div>
				</div>
			</div>
		</div>
    `;
  }
}