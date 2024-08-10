import { Component } from "../core/Component.js";
import { MatchList } from "./Profile-List.js";

export class ProfileInfo extends Component {

	constructor($el, props) {
		super($el, props);
	}

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
		<div id="profileBox">
			<img src="../../back.png" id="goBack"></img>
			<div id="profile">
				<div id="profile-left">
					<div id="profileHeaderBox">
						<span id="profileHeader">Profile</span>
					</div>
					<div id="userInfo">
						<div id="profile-edit">
							${this.props.nickname === this.user.nickname ? `<div id="profile-edit-button">edit</div>` : ""}
						</div>
						<div id="profileUserName">
							<span id="profileNick">${this.user.nickname}</span>
						</div>
						<div id="profileImgBox">
							${this.user.img_url === "" ?
								`<img id="profileImg" src="../../friends.png"></img>` :
								`<img id="profileImg" src="${this.user.img_url}"></img>`}
						</div>
					</div>
				</div>
				<div id="profile-right">
					<div id="match">
						<div id="matchInfo">
							<div id="winRateCircle">
								<canvas class="winRateCircle" id="backgroundCanvas" width="200" height="200"></canvas>
								<canvas class="winRateCircle" id="progressCanvas" width="200" height="200"></canvas>
								<div id="percentage"></div>
							</div>
							<div id="winStat">
								<span id="win">Win </span><span id="winNum">${this.win}</span>
								<span id="lose">Lose </span><span id="loseNum">${this.lose}</span>
								<span id="rate">(${this.rate.toFixed()}%)</span>
							</div>
						</div>
						<div id="matchHistory">
							<ul id="matches">

							</ul>
						</div>
					</div>
					<div id="history">
					</div>
				</div>
			</div>
		</div>
    `;
  }

  	mounted() {
		this.children.push(new MatchList(document.querySelector("ul#matches"), {matches: this.matches}));
	}

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});

		// 컴포넌트가 렌더링된 후 원형 진행 막대를 그립니다.
		this.drawBackgroundCircle();
		this.drawProgressCircle();
		this.updatePercentage();
	}

	drawBackgroundCircle() {
		const canvas = document.getElementById('backgroundCanvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the background circle
		ctx.beginPath();
		ctx.arc(100, 100, 90, 0, 2 * Math.PI);
		ctx.lineWidth = 20;
		ctx.strokeStyle = '#e74c3c';
		ctx.stroke();
	}

	drawProgressCircle() {
		const canvas = document.getElementById('progressCanvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const startAngle = 1.5 * Math.PI;
		const endAngle = startAngle + (2 * Math.PI * (this.rate / 100));

		ctx.beginPath();
		ctx.arc(100, 100, 90, startAngle, endAngle);
		ctx.lineWidth = 20;
		ctx.strokeStyle = '#4074e0';
		ctx.stroke();
	}

	updatePercentage() {
		document.getElementById('percentage').innerText = `${Math.round(this.rate)}%`;
	}
}