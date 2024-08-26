import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class WaitForMatch extends Component {

	template () {
		return `
			<div id="match-box">
				<div id="match-title">Finding Your Match...</div>
				<img src="/img/back.png" id="goBack"></img>
				<div id="matchingRotate">
					<div id="red-box">
						<div id="redBall"></div>
						<div id="redParticle1"></div>
						<div id="redParticle2"></div>
						<div id="redParticle3"></div>
						<div id="redParticle4"></div>
						<div id="redParticle5"></div>
						<div id="redParticle6"></div>
						<div id="redParticle7"></div>
						<div id="redParticle8"></div>
					</div>
					<div id="yellow-box">
						<div id="yellowBall"></div>
						<div id="yellowParticle"></div>
					</div>
				</div>
				<div id="matchingText"></div>
			</div>
		`;
	}

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});
	}
}
