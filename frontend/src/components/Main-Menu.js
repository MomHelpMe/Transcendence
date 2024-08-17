import { Component } from "../core/Component.js";
import { List } from "./List.js";
import { changeUrl } from "../core/router.js";

export class Menu extends Component {

  template () {
    return `
		<div id="menuBox">
		  <ul id="gameMenu"></ul>
		  <ul id="userMenu"></ul>
		</div>
    `;
  }

  mounted(){
	this.children.push(new List(document.querySelector("ul#gameMenu"), { className: "gameMode", contents: ["LocalGame", "Multi Game", "AI", "Tournament"]}));
	this.children.push(new List(document.querySelector("ul#userMenu"), { className: "showInfo", contents: ["Friends", "Profile", "Setting"]}));
  }

  setEvent () {
    this.addEvent('click', '#Friends', () => {
      changeUrl("/main/friends");
    });

	this.addEvent('click', '#LocalGame', () => {
		const uid = "145058";
		changeUrl(`/game/local/${uid}`);
	});

	this.addEvent('click', '#Profile', () => {
		// api로 user 정보 가져오기
		const user = "seonjo";
	  changeUrl(`/main/profile/${user}`);
	});
  }
}
