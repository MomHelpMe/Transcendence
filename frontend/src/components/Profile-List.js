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
						<span id="date">Date</span>
						<div id="startTime">${element.startTime}</div>
						<div id="playTime">${element.playTime}</div>
					</div>
					<div id="opImg">
						<img id="opImg" src=${element.img_url}></img>
					</div>
					<div id="matchOp">
						<span id="vs">VS  </span>
						<span id="opNick">${element.opNick}</span>
					</div>
					<div id="matchScore">
						<span id="myScore${element.type}">${element.myScore}</span>
						<span id="vsSign"> : </span>
						<span id="opScore">${element.opScore}</span>
					</div>
				</li>`
			}).join('')}
		`;
	}
}