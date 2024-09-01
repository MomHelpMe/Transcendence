import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class Error404Page extends Component {

	template () {
		return `
			<div id="error-box">
				<div id="error-msg-box">
					<h1 id="error-title">Oops!</h1>
					<h2 id="error-body">We can't seem to find</h2>
					<h2 id="error-body">the page you're looking for.</h2>
					<p id="error-code">Error code: 404</p>
					<div id="goMainMenu">Return Main</div>
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
