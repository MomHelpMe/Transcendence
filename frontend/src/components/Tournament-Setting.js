import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class TournamentSetting extends Component {

	template () {
		// fetch(){
		//	tournament history 조회
		//}

		let idx = 0;
		const max = 4;
		const games = {
			"game_info": '{ "game1": {"Jiko": 1, "PSY": 2}, "game2": {"KimYuna": 2, "BTS": 1}, "game3": {"PSY": 2, "KimYuna": 1} }'
		};

		return `
			<div id="tournament-box">
				<div id="tournament-game-menu">Game</div>
				<div id="tournament-history-menu">History</div>
				<div id="tournament-title">Tournament</div>
				<img src="/img/back.png" id="goBack"></img>
				<div id="tournament-main-body">
					<img src="/img/tournament.png" id="tournament-img"></img>
					<div id="tournament-challenge-text">Take on the challenge</div>
				</div>
				<div id="tournament-game-body">
					<div id="tournament-crown-box">
						<img id="crown" src="/img/crown.png"></img>
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
						<input class="tournament-input" autocomplete="off" id="tournament-nick1" maxlength="8" placeholder="nickname1"></input>
						<input class="tournament-input" autocomplete="off" id="tournament-nick2" maxlength="8" placeholder="nickname2"></input>
						<div id="tournament-blank"></div>
						<input class="tournament-input" autocomplete="off" id="tournament-nick3" maxlength="8" placeholder="nickname3"></input>
						<input class="tournament-input" autocomplete="off" id="tournament-nick4" maxlength="8" placeholder="nickname4"></input>
					</div>
					<div id="tournament-start-button">S T A R T</div>
				</div>
				<div id="tournament-history-body">
					<div id="tournament-crown-box">
						<img id="crown" src="/img/crown.png"></img>
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
						<div id="tournament-nick2">TBD</div>
						<div id="tournament-nick2">TBD</div>
						<div id="tournament-blank"></div>
						<div id="tournament-nick2">TBD</div>
						<div id="tournament-nick2">TBD</div>
					</div>
					<div id="tournament-history-button-box">
						<div id="tournament-prev-button"></div>
						<div id="tournament-game-name">Game 1</div>
						<div id="tournament-next-button"></div>
					</div>
				</div>
			</div>
		`;
	}

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});
		
		this.addEvent('click', '#tournament-start-button', (event) => {
			console.log("you press start button!!");
		});

		this.addEvent('click', '#tournament-game-menu', (event) => {
			const gameMenu = document.querySelector('#tournament-game-menu');
			const historyMenu = document.querySelector('#tournament-history-menu');
			const mainBody = document.querySelector('#tournament-main-body');
			const gameBody = document.querySelector('#tournament-game-body');
			const historyBody = document.querySelector('#tournament-history-body');

			gameMenu.style.color = '#6dd5fa';
			historyMenu.style.color = 'white';
			mainBody.style.display = 'none';
			historyBody.style.display = 'none';
			gameBody.style.display = 'flex';
		});
		
		this.addEvent('click', '#tournament-history-menu', (event) => {
			const gameMenu = document.querySelector('#tournament-game-menu');
			const historyMenu = document.querySelector('#tournament-history-menu');
			const mainBody = document.querySelector('#tournament-main-body');
			const gameBody = document.querySelector('#tournament-game-body');
			const historyBody = document.querySelector('#tournament-history-body');
			
			historyMenu.style.color = '#6dd5fa';
			gameMenu.style.color = 'white';
			mainBody.style.display = 'none';
			gameBody.style.display = 'none';
			historyBody.style.display = 'flex';
		});
	}
}
