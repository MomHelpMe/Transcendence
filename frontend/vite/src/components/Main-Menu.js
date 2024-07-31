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
	this.children.push(new List(document.querySelector("ul#gameMenu"), { className: "gameMode", contents: ["Local Game", "Multi Game", "AI", "Tournament"]}));
	this.children.push(new List(document.querySelector("ul#userMenu"), { className: "showInfo", contents: ["Friends", "Profile", "Setting"]}));
  }

  setEvent () {
    this.addEvent('click', '#Friends', () => {
      changeUrl("/main/friends");
    });
  }
}
