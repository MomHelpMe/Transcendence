import { Component } from "../core/Component.js";

export class Menu extends Component {

  template () {
    return `
		<div id="menuBox">
		  <div id="smallMenu">
		  	<div id="friendsMenu">
			  <p>Friends</p>
			</div>
			<div id="profileMenu">
			  <p>Profile</p>
		    </div>
			<div id="settingMenu">
			  <p>Setting</p>
		 	</div>
		  </div>
		  <div id="bigMenu">
		    <div id="gameMenu">
			  <p>Game</p>
			</div>
		  </div>
		</div>
    `;
  }

  setEvent () {
    this.addEvent('click', '#login', () => {
      console.log("clicked!!");
    });
  }
}