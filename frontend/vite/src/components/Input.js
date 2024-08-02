import { Component } from "../core/Component.js";

export class Input extends Component {

  template () {
	return `
		<div id="inputBox">
			<input type="text" id="${this.props.inputId}" placeholder="Search for friends...">
			<span id="${this.props.inputId}Alert"></span>
		</div>
		<img id="${this.props.imageId}" src="${this.props.img}"></img>
    `;
  }
}