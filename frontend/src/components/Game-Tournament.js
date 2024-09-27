import { GameDefault } from "./Game-Default.js";
import { GameTournamentCore } from "./Game-Tournament-Core.js";
import { changeUrl } from "../core/router.js";

export class GameTournament extends GameDefault {
	mounted(){
		const nicknames = JSON.parse(localStorage.getItem("nicknames"));
		console.log(nicknames[0]);
		if (!localStorage.getItem('game1')) {
			this.props["game"] = 1;
			this.props["nick1"] = nicknames["nick1"];
			this.props["nick2"] = nicknames["nick2"];
		} else if (!localStorage.getItem('game2')) {
			this.props["game"] = 2;
			this.props["nick1"] = nicknames["nick3"];
			this.props["nick2"] = nicknames["nick4"];
		} else if (!localStorage.getItem('game3')) {
			this.props["game"] = 3;
			const game1 = JSON.parse(localStorage.getItem('game1'));
			const game2 = JSON.parse(localStorage.getItem('game2'));
			nicknames.forEach((nickname) => {
				if (game1.winner === nickname) this.props["nick1"] = nickname;
				if (game2.winner === nickname) this.props["nick2"] = nickname;
			});
		} else {
			changeUrl("/main/tournament");
		}
		console.log(this.props);
		new GameTournamentCore(document.querySelector("div#game"), this.props);
	}
}