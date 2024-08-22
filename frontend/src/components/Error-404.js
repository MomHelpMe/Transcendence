import { Component } from "../core/Component.js";

export class Error404 extends Component {

	template () {
		return `
			<div id="error-box">
				<div id="error-msg-box">
					<h1 id="error-title">Oops!</h1>
					<h2 id="error-body">We can't seem to find</h2>
					<h2 id="error-body">the page you're looking for.</h2>
					<p id="error-code">Error code: 404</p>
				</div>
				<div id="error-img-box">
					<img id="notFound" src="/img/404.jpeg"></img>
				</div>
			</div>
		`;
	}
}
