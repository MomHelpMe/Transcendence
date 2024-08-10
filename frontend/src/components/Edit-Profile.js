import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class EditProfile extends Component {

  template () {
	this.user = { nickname: "seonjo", img_url: "../../소년명수.png"};
	// api로 win, lose, rate 호출
	this.win = 35;
	this.lose = 20;
	this.rate = (35 / 55) * 100;
	this.matches = [
		{startTime: "7/5 18:05", playTime: "30 min", img_url: "../../소년명수.png", type: "win", myScore: 5, opScore: 3, opNick: "michang" },
		{startTime: "7/3 18:25", playTime: "22 min", img_url: "../../소년명수.png", type: "lose", myScore: 3, opScore: 5, opNick: "jiko" },
		{startTime: "7/1 21:15", playTime: "18 min", img_url: "../../소년명수.png", type: "win", myScore: 5, opScore: 2, opNick: "jaehejun" },
		{startTime: "6/25 10:34", playTime: "22 min", img_url: "../../소년명수.png", type: "win", myScore: 5, opScore: 3, opNick: "seunan" },
		{startTime: "6/18 22:53", playTime: "17 min", img_url: "../../소년명수.png", type: "lose", myScore: 1, opScore: 5, opNick: "michang" },
		{startTime: "6/17 12:14", playTime: "50 min", img_url: "../../소년명수.png", type: "lose", myScore: 0, opScore: 5, opNick: "jaehejun" },
		{startTime: "6/5 18:21", playTime: "43 min", img_url: "../../소년명수.png", type: "lose", myScore: 2, opScore: 5, opNick: "jiko" },
		{startTime: "6/2 11:43", playTime: "23 min", img_url: "../../소년명수.png", type: "win", myScore: 5, opScore: 3, opNick: "seunan" },
	];
	console.log(this.props.nickname, this.user);
    return `

    `;
  }

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});

	}
}