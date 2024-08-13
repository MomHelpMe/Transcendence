import { Component } from "../core/Component.js";

export class List extends Component {

	template () {
		const { className, contents } = this.props;
		return `
			${contents.map(element => {
				const part = element.split('#');
				const nickname = part[0];
				return `<li class="${className}" id="${element}">${nickname}</li>`
			}).join('')}
		`;
	}
}