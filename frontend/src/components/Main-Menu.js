import { Component } from "../core/Component.js";
import { List } from "./List.js";
import { changeUrl } from "../core/router.js";
import { parseJWT } from "../core/jwt.js";

export class Menu extends Component {
	translate() {
		const languages = {
			0: {
				gameMenuTexts: ["Local Game", "Multi Game", "Tournament"],
				userMenuTexts: ["Friends", "Profile", "Logout"],
				lanText: "Change Language"
			},
			1: {
				gameMenuTexts: ["로컬 게임", "멀티 게임", "토너먼트"],
				userMenuTexts: ["친구", "프로필", "로그아웃"],
				lanText: "언어 변경"
			},
			2: {
				gameMenuTexts: ["ローカルゲーム", "マルチゲーム", "トーナメント"],
				userMenuTexts: ["友達", "プロフィール", "ログアウト"],
				lanText: "言語を変更"
			}
		};
	
		this.translations = languages[this.props.lan.value];
	
	}

	template () {
		const payload = parseJWT();
		if (!payload) this.uid = null;
		else this.uid = payload.id;

		const translations = this.translations;

		return `
			<div id="menuBox">
				<div id="lanButton">${translations.lanText}</div>
				<ul id="gameMenu"></ul>
				<ul id="userMenu"></ul>
			</div>
		`;
	}

	mounted(){
		new List(document.querySelector("ul#gameMenu"), { className: "gameMode", ids: ["LocalGame", "MultiGame", "Tournament"], contents: this.translations.gameMenuTexts});
		new List(document.querySelector("ul#userMenu"), { className: "showInfo", ids: ["Friends", "Profile", "Logout"], contents: this.translations.userMenuTexts});
	}

	setEvent () {
		this.addEvent('click', '#Friends', () => {
			changeUrl("/main/friends");
		});

		this.addEvent('click', '#LocalGame', () => {
			changeUrl(`/game/local/${this.uid}`);
		});

		this.addEvent('click', "#MultiGame", () => {
			changeUrl("/main/matching");
		});

		this.addEvent('click', "#Tournament", () => {
			changeUrl("/main/tournament");
		});

		this.addEvent('click', '#lanButton', () => {
			this.props.lan.value = (this.props.lan.value + 1) % 3;
			changeUrl("/main")
		});

		this.addEvent('click', '#Profile', () => {
			if (this.uid) changeUrl(`/main/profile/${this.uid}`);
			else changeUrl("/");
		});

		this.addEvent('click', '#Logout', () => {
			// API !! ME POST
			fetch("https://localhost:443/api/me/", {
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
