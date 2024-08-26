import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class TournamentSetting extends Component {

	template () {
		return `
			<div id="tournament-box">
				<div id="tournament-title">Tournament</div>
				<img src="/img/back.png" id="goBack"></img>
				<div id="tournament-body">
					<div id="tournament-start-button-box">
						<img id="crown" src="/img/crown.png"></img>
						<div id="tournament-start-button">start</div>
					</div>
					<div id="tournament-players">
						<div id="tournament-nick">Winner</div>
					</div>
					<div id="tournament-lines">
						<div id="tournament-line1"></div>
					</div>
					<div id="tournament-players">
						<div id="tournament-nick">TBD</div>
						<div id="tournament-nick">TBD</div>
					</div>
					<div id="tournament-lines">
						<div id="tournament-line2"></div>
						<div id="tournament-line2"></div>
					</div>
					<div id="tournament-players">
						<input class="tournament-input" autocomplete="off" id="tournament-nick1" maxlength="10" placeholder="nickname1"></input>
						<input class="tournament-input" autocomplete="off" id="tournament-nick2" maxlength="10" placeholder="nickname2"></input>
						<div id="tournament-blank"></div>
						<input class="tournament-input" autocomplete="off" id="tournament-nick3" maxlength="10" placeholder="nickname3"></input>
						<input class="tournament-input" autocomplete="off" id="tournament-nick4" maxlength="10" placeholder="nickname4"></input>
					</div>
				</div>
			</div>
		`;
	}

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});
	}
}
