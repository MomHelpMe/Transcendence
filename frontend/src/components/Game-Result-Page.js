import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class GameResultPage extends Component {

	template () {
		return `
			<div id="game-result-box">
				<div id="game-winner-box">
					<div id="game-winner">Winner is ${this.props.winner}!!!</div>
					<div id="game-result-button">OK</div>
				</div>
			</div>
		`;
	}
	
	setEvent() {
		
		function checkNick(nicknames, nick) {
			if (nicknames[nick1] !== nick &&
				nicknames[nick2] !== nick &&
				nicknames[nick3] !== nick &&
				nicknames[nick4] !== nick) {
				return false;
			}
			return true;
		}

		this.addEvent('click', '#game-result-button', (event) => {
			if (this.props.isTournament){
				const game1 = localStorage.getItem('game1');
				const game2 = localStorage.getItem('game2');
				const game3 = localStorage.getItem('game3');
				if (game1 && !game2 && !game3) {
					console.log("go game2!!");
					changeUrl(`/game/tournament/${this.props.uid}`);
				} else if (game1 && game2 && !game3) {
					console.log("go game3!!");
					changeUrl(`/game/tournament/${this.props.uid}`);
				} else if (game1 && game2 && !game3) {
					const nicknames = localStorage.getItem(`nicknames`);
					if (!nicknames) changeUrl("/main/tournament");
					const parsedNicknames = JSON.parse(nicknames);
					const parsedGame1 = JSON.parse(game1);
					const parsedGame2 = JSON.parse(game2);
					const parsedGame3 = JSON.parse(game3);
					
					if (!checkNick(nicknames, parsedGame1.winner) ||
						!checkNick(nicknames, parsedGame1.loser) ||
						!checkNick(nicknames, parsedGame2.winner) ||
						!checkNick(nicknames, parsedGame2.loser) ||
						!checkNick(nicknames, parsedGame3.winner) ||
						!checkNick(nicknames, parsedGame3.loser) ) {
						changeUrl("/main/tournament");
					}
					if (!(parsedGame1.winner === parsedGame3.winner && parsedGame2.winner === parsedGame3.loser) &&
					    !(parsedGame1.winner === parsedGame3.winner && parsedGame2.winner === parsedGame3.loser)) {
							changeUrl("/main/tournament");
					}
	
					console.log("game set!!");
					console.log(parsedGame1);
					console.log(parsedGame2);
					console.log(parsedGame3);
					changeUrl("/main/tournament");

				} else {
					changeUrl("/main/tournament");
				}
			}else {
				changeUrl("/main", false);
			}			
		});
	}
}
