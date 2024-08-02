import { Component } from "../core/Component.js";

export class List extends Component {

	template () {
		const { className, contents } = this.props;
		return `
		  ${contents.map(element => {
			let text = element;
			if (text.length > 10) {
				text = text.substring(0, 10) + "...";
			  }
			return `<li class="${className}" id="${element}">${text}</li>`}).join('')}
		`;
	}
}