import { Component } from "../core/Component.js";
export class FriendsInfo extends Component {

  template () {
	const { is_online, nickname, img_url } = this.props;
    return `
		<div id="onlineInfo">
			${is_online ? `<div id="online"></div>` : `<div id="offline"></div>`}
			<div id="friendNick">${nickname}</div>
		</div>
		<div id="friendImage">
			<img id="friendImage" src="../../소년명수.png"></img>
		</div>
		<div id="friendBottom">
			<div class="goProfile" id="${nickname}">View Profile</div>
			<div class="removeFriend" id="${nickname}">Remove</div>
		</div>
    `;
  }
}