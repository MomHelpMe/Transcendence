import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class ProfileInfo extends Component {

	constructor($el, props) {
		super($el, props);
	}

  template () {
	this.user = { nickname: "seonjo", img_url: "../../소년명수.png"};
	console.log(this.props.nickname, this.user);
    return `
		<div id="profile-left">
			<div id="profile-edit">
				${this.props.nickname === this.user.nickname ? `<div id="profile-edit-button">edit</div>` : ""}
			</div>
			<div id="profileUserName">${this.user.nickname}
			</div>
			<div id="profileImg>
			</div>
		</div>
		<div id="profile-right>
		</div>
    `;
  }

  setEvent () {
    this.addEvent('click', '#login', () => {
      changeUrl("/main");
    });
  }
}