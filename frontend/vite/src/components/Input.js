import { Component } from "../core/Component.js";

export class Input extends Component {

  template () {
	return `
		<div id="inputBox">
			<input type="text" id="${this.props.inputId}" required autocomplete="off" placeholder="Search for friends...">
			<div id="searchResults" class="search-results"></div>
		</div>
		<img id="${this.props.imageId}" src="${this.props.img}"></img>
    `;
  }
}