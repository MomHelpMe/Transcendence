import { GameDefault } from "./Game-Default.js";
import { GameTournamentCore } from "./Game-Tournament-Core.js";
import { changeUrl } from "../core/router.js";

export class GameTournament extends GameDefault {
	mounted(){
		const nicknames = JSON.parse(localStorage.getItem("nickanems"));
		if (!localStorage.getItem('game1')) {
			this.props[game] = 1;
			this.props[nick1] = nicknames[0];
			this.props[nick2] = nicknames[1];
		} else if (!localStorage.getItem('game2')) {
			this.props[game] = 2;
			this.props[nick1] = nicknames[2];
			this.props[nick2] = nicknames[3];
		} else if (!localStorage.getItem('game3')) {
			this.props[game] = 3;
			const game1 = JSON.parse(localStorage.getItem('game1'));
			const game2 = JSON.parse(localStorage.getItem('game2'));
			for (i = 0; i < 4; i++) {
				if (game1.winner === nicknames[i]) this.props[nick1] = nicknames[i];
				else if (game2.winner === nicknames[i]) this.props[nick2] = nicknames[i];
			}
		} else {
			changeUrl("/main/tournament");
		}
		new GameTournamentCore(document.querySelector("div#game"), this.props);
	}
}