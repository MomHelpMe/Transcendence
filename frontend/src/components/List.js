import { Component } from "../core/Component.js";

export class List extends Component {

	template () {
		const { className, ids, contents } = this.props;
		return `
			${contents.map((element, index) => {
				const part = element.split('#');
				const nickname = part[0];
				return `<li class="${className}" id="${ids[index]}">${nickname}</li>`
			}).join('')}
		`;
	}
}