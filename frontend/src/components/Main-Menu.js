import { Component } from "../core/Component.js";
import { List } from "./List.js";
import { changeUrl } from "../core/router.js";
import { parseJWT } from "../core/jwt.js";

export class Menu extends Component {

	template () {
		const payload = parseJWT();
		if (!payload) this.uid = null;
		else this.uid = payload.id;

		return `
			<div id="menuBox">
			<ul id="gameMenu"></ul>
			<ul id="userMenu"></ul>
			</div>
		`;
	}

	mounted(){
		new List(document.querySelector("ul#gameMenu"), { className: "gameMode", contents: ["Local Game", "Multi Game", "AI", "Tournament"]});
		new List(document.querySelector("ul#userMenu"), { className: "showInfo", contents: ["Friends", "Profile", "Logout"]});
	}

	setEvent () {
		this.addEvent('click', '#Friends', () => {
			changeUrl("/main/friends");
		});

		this.addEvent('click', '#Profile', () => {
			if (this.uid) changeUrl(`/main/profile/${this.uid}`);
			else changeUrl("/");
		});

		this.addEvent('click', '#Logout', () => {
			// API !! ME POST
			fetch("http://localhost:80/api/me/", {
				method: 'POST',
				credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
			})
			.then(response => {
				if (response.ok) changeUrl(`/`);
				else throw new Error('Network response was not ok');
			})
			.catch(error => console.error('Fetch error:', error));
		});
	}
}
