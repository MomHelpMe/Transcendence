import { Component } from "../core/Component.js";

export class ErrorPage extends Component {

	translate() {
		const languages = {
			0: {
				errorText: ["Oops!", "There seems to be a problem."]
			},
			1: {
				errorText: ["이런!", "문제가 발생한 것 같습니다."]
			},
			2: {
				errorText: ["おっと！", "問題が発生したようです。"]
			}
		};
	
		this.translations = languages[this.props.lan.value];
	
	}

	template () {

		const translations = this.translations;

		return `
			<div id="error-box">
				<div id="error-msg-box">
					<h1 id="error-title2">${translations.errorText[0]}</h1>
					<h1 id="error-title2">${translations.errorText[1]}</h1>
				</div>
				<div id="error-img-box">
					<img id="error-img" src="/img/error.png"></img>
				</div>
			</div>
		`;
	}
}
