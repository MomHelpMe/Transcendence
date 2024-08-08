import { Component } from "../core/Component.js";

export class MatchList extends Component {

	template () {
		const { matches } = this.props;
		return `
		  ${matches.map(element => {
			console.log(element);
			return `
				<li class="matchComponent" id="${element.type}Type">
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