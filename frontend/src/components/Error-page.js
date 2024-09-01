import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class ErrorPage extends Component {

	template () {
		return `
			<div id="error-box">
				<div id="error-msg-box">
					<h1 id="error-title">Oops! There seems to be a problem.</h1>
				</div>
				<div id="error-img-box">
					<img id="notFound" src="/img/error.jpeg"></img>
				</div>
			</div>
		`;
	}
}
