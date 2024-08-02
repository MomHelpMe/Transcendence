import { Component } from "../core/Component.js";

export class FriendsInfo extends Component {

  template () {
	const { is_online, nickname, img_url } = this.props;
	console.log(this.props);
    return `
		<div id="onlineInfo">
			${is_online ? `<div id="online"></div>` : `<div id="offline"></div>`}
		</div>
		<div id="imageInfo">
		</div>
		<div id="goProfile>
		</div>
    `;
  }
}