import { Component } from "../core/Component.js";

export class Search extends Component {

  template () {
	return `
		<div id="inputBox">
			<input type="text" id="${this.props.inputId}" placeholder="Search for friends...">
			<span id="alert"></span>
		</div>
		<img id="${this.props.imageId}" src="${this.props.img}"></img>
    `;
  }
}