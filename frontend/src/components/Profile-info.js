import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class ProfileInfo extends Component {

	constructor($el, props) {
		super($el, props);
	}

  template () {
	this.user = { nickname: "seonjo", img_url: "../../소년명수.png"};
	this.win = 35;
	this.lose = 20;
	this.rate = 70;
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
							<span id="win">
								Win  ${this.win}
							</span>
							<span id="lose">
								Lose  ${this.lose}
							</span>
							<span id="rate">
								Rate  ${this.rate}%
							</span>
						</div>
						<div id="matchHistory">
							<span id="matchHeader>Match History</span>
						</div>
					</div>
				</div>
			</div>
		</div>
    `;
  }

  setEvent () {
	this.addEvent('click', '#goBack', (event) => {
		window.history.back();
	  });
  }
}