import { Component } from "../core/Component.js";

export class MatchList extends Component {

	template () {
		const { matches } = this.props;
		console.log("hi3");
		if (!matches) return "";
		console.log("hi4");
		console.log(matches);
		return `
		  ${matches.map(element => {
			return `
				<li class="matchComponent" id="${element.is_win ?"win":"lose"}Type">
					<div id="matchTime">
						<span id="date">Date</span>
						<div id="startTime">${element.start_timestamp}</div>
						<div id="playTime">${element.playtime}min</div>
					</div>
					<div id="opImg">
						<img id="opImg" src=${element.op_user.img_url}></img>
					</div>
					<div id="matchOp">
						<span id="vs">VS  </span>
						<span id="opNick">${element.op_user.nickname}</span>
					</div>
					<div id="matchScore">
						<span id="myScore${element.is_win ?"win":"lose"}">${element.my_score}</span>
						<span id="vsSign"> : </span>
						<span id="opScore">${element.op_score}</span>
					</div>
				</li>`
			}).join('')}
		`;
	}
}