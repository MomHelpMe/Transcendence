import { Component } from "../core/Component.js";

export class EditProfile extends Component {

  template () {
	this.nickname = "seonjo";
	this.img_url = "/friends.png";
	this.TwoFA = true;
    return `
		<div id="edit-box">
			<div id="editTitle">
				Edit Profile
			</div>
			<div id="editContents">
				<div id="prevProfile">
					<div id="edit-nick">
						<label for="nickname">Nickname:</label>
						<div id="presentNick">${this.nickname}</div>
					</div>
					<div id="edit-img">
						<div id="image-preview">
							<img id="presentImage" src="${this.img_url}" alt="Profile Image"></img>
						</div>
					</div>
					<div id="edit-2FA">
						<label for="2fa-toggle">Enable 2FA:</label>
						${this.TwoFA ? `<input type="checkbox" id="2fa-toggle" checked disabled>` : `<input type="checkbox" id="2fa-toggle">`}
					</div>
				</div>
				<div id="Arrow">
					<img id="arrowImg" src="/arrow.png"></img>
				</div>
				<div id="changedProfile">
					<div id="edit-nick">
						<label for="nickname">Nickname:</label>
						<input type="text" id="nickname" value="${this.nickname}">
					</div>
					<div id="edit-img">
						<div id="image-preview">
							<img id="profile-image" src="${this.img_url}" alt="Profile Image"></img>
						</div>
						<div id="file-upload-wrapper">
							<div id="custom-file-upload">
								<span>Click to choose a file</span>
							</div>
							<input type="file" id="file-upload" accept="image/*">
						</div>
					</div>
					<div id="edit-2FA">
						<label for="2fa-toggle">Enable 2FA:</label>
						${this.TwoFA ? `<input type="checkbox" id="2fa-toggle" checked>` : `<input type="checkbox" id="2fa-toggle">`}
					</div>
					<button id="profileChange" type="submit">Save Changes</button>
				</div>
			</div>
		</div>
    `;
  }

	setEvent() {
		this.addEvent('click', '#goBack', (event) => {
			window.history.back();
		});
		
		this.addEvent('change', '#file-upload', (event) => { // ID를 #file-upload로 수정
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = function(e) {
					document.getElementById('profile-image').src = e.target.result;
				};
				reader.readAsDataURL(file);
			}
		});

		this.addEvent('')
	}
}