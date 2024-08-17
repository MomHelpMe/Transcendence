import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class EditProfile extends Component {

	initState() {
		this.nickname = "";
		this.img_url = "";
		this.is_2FA = true;

		//API!! ME GET
		fetch("http://localhost:80/api/me/", {
			method: 'GET',
			credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			this.state.nickname = data.nickname;
			this.state.img_url = data.img_url;
			this.state.is_2FA = data.is_2FA;
		})
		.catch(error => console.error('Fetch error:', error));
		return { nickname: this.nickname, img_url: this.img_url, is_2FA: this.is_2FA };
	}
	
	template () {
		return `
			<div id="edit-box">
				<div id="deleteButton">Delete Account</div>
				<div id="deleteDoubleCheck">
					<div id="deleteAlertMsg">
						Are you sure you want to delete your account?
					</div>
					<div id="deleteChoiceBox">
						<div id="deleteYesButton">Yes</div>
						<div id="deleteNoButton">No</div>
					</div>
				</div>
				<img src="/back.png" id="goBack"></img>
				<div id="editTitle">
					Edit Profile
				</div>
				<div id="editContents">
					<div id="prevProfile">
						<div id="edit-nick">
							<label for="nickname">Nickname:</label>
							<div id="presentNick">${this.state.nickname}</div>
						</div>
						<div id="edit-img">
							<div id="image-preview">
								<img id="presentImage" src="${this.state.img_url}" alt="Profile Image"></img>
							</div>
							<div id="url-upload-wrapper">
								<label for="image-url">Present Image URL</label>
								<input type="text" id="image-url" value="${this.state.img_url}" placeholder="Enter image URL" readonly>
							</div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">Enable 2FA:</label>
							${this.state.is_2FA ? `<input type="checkbox" id="2fa-toggle" checked disabled>` : `<input type="checkbox" id="2fa-toggle" disabled>`}
						</div>
					</div>
					<div id="Arrow">
						<img id="arrowImg" src="/arrow.png"></img>
					</div>
					<div id="changedProfile">
						<div class="edit" id="edit-nick">
							<label for="nickname">Nickname:</label>
							<input type="text" id="nickname" value="${this.state.nickname}" autocomplete="off" maxlength="10">
							<div id="nickname-error" class="error-message"></div>
						</div>
						<div class="edit" id="edit-img">
							<div id="image-preview">
								<img id="profile-image" src="${this.state.img_url}" alt="Profile Image"></img>
							</div>
							<div id="url-upload-wrapper">
								<label for="image-url">Enter Image URL</label>
								<input type="text" id="image-url" value="${this.state.img_url}" placeholder="Enter image URL">
							</div>
							<div id="image-error" class="error-message"></div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">Enable 2FA:</label>
							${this.state.is_2FA ? `<input type="checkbox" id="2fa-toggle" checked>` : `<input type="checkbox" id="2fa-toggle">`}
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
		
		this.addEvent('change', '#image-url', (event) => {
			const imageUrl = event.target.value;
			if (imageUrl) {
				document.getElementById('profile-image').src = imageUrl;
			}
		});

		this.addEvent('click', '#deleteButton', (event) => {
			document.getElementById('deleteDoubleCheck').style.display = 'flex';
		});

		this.addEvent('click', '#deleteNoButton', (event) => {
			document.getElementById('deleteDoubleCheck').style.display = 'none';
		});

		this.addEvent('click', '#deleteYesButton', (event) => {
			//API!! ME DELETE
			fetch("http://localhost:80/api/me/", {
				method: 'DELETE',
				credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
			})
			.then(response => {
				if (response.ok) changeUrl(`/`);
				else throw new Error('Network response was not ok');
			})
			.catch(error => console.error('Fetch error:', error));
		});
		
		this.addEvent('click', '#profileChange', async (event) => {
			event.preventDefault();
			
			// Clear any previous error messages
			document.getElementById('nickname-error').textContent = '';
			document.getElementById('image-error').textContent = '';

			// Fetch the values
			const nickname = document.getElementById('nickname').value;
			const imageUrl = document.getElementById('image-url').value;
			const is_2FA = document.getElementById('2fa-toggle').checked;	

			// Create FormData object to send file and other data
			const formData = new FormData();
			formData.append('nickname', nickname);
			formData.append('is_2FA', is_2FA);
			formData.append('img_url', imageUrl);

			// API!! ME PUT
			fetch('http://localhost:80/api/me/', {
				method: 'PUT',
				credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
				body: formData
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.error('Failed to update profile. Status:', response.status);
					throw new Error('Failed to update profile');
				}
			})
			.then(result => {
				// nickname이 유효하지 않으면 경고문 띄움
				if (!result.is_valid_nick) {
					document.getElementById('nickname-error').textContent = "nickname is invalid!";
				}
			
				// image가 유효하지 않으면 경고문 띄움
				if (!result.is_valid_img) {
					document.getElementById('image-error').textContent = "image is invalid!";
				}
			
				if (result.is_valid_nick && result.is_valid_img) {
					changeUrl(`/main/profile/${this.props.uid}/edit`);
				}
			})
			.catch(error => {
				console.error('Error updating profile:', error);
			});
		});
	}
}
