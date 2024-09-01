import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class Error404Page extends Component {

	translate() {
		const languages = {
			0: {
				errorText: ["Oops!", "We can't seem to find", "the page you're looking for.", "Error code: 404"],
				returnText: "Return Main",
			},
			1: {
				errorText: ["이런!", "찾고 계신 페이지를", "찾을 수 없습니다.", "오류 코드: 404"],
				returnText: "메인 화면",
			},
			2: {
				errorText: ["おっと！", "お探しのページが", "見つかりません。", "エラーコード: 404"],
				returnText: "メインに戻る",
			}
		};
	
		this.translations = languages[this.props.lan.value];
	
	}

	template () {

		const translations = this.translations;

		return `
		<div id="error-box">
				<div id="error-msg-box">
					<h1 id="error-title">${translations.errorText[0]}</h1>
					<h2 id="error-body">${translations.errorText[1]}</h2>
					<h2 id="error-body">${translations.errorText[2]}</h2>
					<p id="error-code">${translations.errorText[3]}</p>
					<div id="goMainMenu">${translations.returnText}</div>
				</div>
				<div id="error-img-box">
					<img id="notFound" src="/img/404.jpeg"></img>
				</div>
			</div>
		`;
	}

	setEvent() {
		this.addEvent('click', '#goMainMenu', (event) => {
			changeUrl("/main", false);
		});
		
	}
}
