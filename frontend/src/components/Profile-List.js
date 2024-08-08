import { Component } from "../core/Component.js";

export class MatchList extends Component {

	template () {
		const { matches } = this.props;
		return `
		  ${matches.map(element => {
			return `
				<li id="${element.type}">
					<div id="matchTime">
					</div>
					<div id="matchOp">
					</div>
					<div id="matchScore">
					</div>
				</li>`
			}).join('')}
		`;
	}
}