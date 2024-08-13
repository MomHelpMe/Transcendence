import { Component } from "../core/Component.js";
import { List } from "./List.js";
import { changeUrl } from "../core/router.js";

export class Menu extends Component {

	template () {
		fetch(url, {
			method: 'GET',
			credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			this.userNick = data.userNick;
		})
		.catch(error => console.error('Fetch error:', error));

		return `
			<div id="menuBox">
			<ul id="gameMenu"></ul>
			<ul id="userMenu"></ul>
			</div>
		`;
	}

	mounted(){
		this.children.push(new List(document.querySelector("ul#gameMenu"), { className: "gameMode", contents: ["Local Game", "Multi Game", "AI", "Tournament"]}));
		this.children.push(new List(document.querySelector("ul#userMenu"), { className: "showInfo", contents: ["Friends", "Profile", "Logout"]}));
	}

	setEvent () {
		this.addEvent('click', '#Friends', () => {
			changeUrl("/main/friends");
		});

		this.addEvent('click', '#Profile', () => {
			changeUrl(`/main/profile/${this.userNick}`);
		});

		this.addEvent('click', '#Logout', () => {
			fetch(url, {
				method: 'DELETE',
				credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				changeUrl(`/`);
			})
			.catch(error => console.error('Fetch error:', error));
		});
	}
}
