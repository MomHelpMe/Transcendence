import { Component } from "../core/Component.js";
export class FriendsInfo extends Component {

  template () {
	const { is_online, nickname, img_url } = this.props;
    let nick = nickname;
	if (nick.length > 10) {
      nick = nick.substring(0, 10) + "...";
    }
    return `
		<div id="onlineInfo">
			${is_online ? `<div id="online"></div>` : `<div id="offline"></div>`}
			<div id="friendNick">${nick}</div>
		</div>
		<div id="friendImage">
			<img id="friendImage" src="../../소년명수.png"></img>
		</div>
		<div class="goProfile" id="${nickname}">Profile
		</div>
    `;
  }
}