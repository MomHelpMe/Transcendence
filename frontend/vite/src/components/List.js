import { Component } from "../core/Component.js";

export class List extends Component {

	template () {
		const { className, contents } = this.props;
		return `
		  ${contents.map(element => `<li class="${className}" id="${element}">${element}</li>`).join('')}
		`;
	}
}