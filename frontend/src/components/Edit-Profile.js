import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class EditProfile extends Component {

	template () {
		//API!!
		fetch(url, {
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
			this.nickname = data.user.nickname;
			this.img_url = data.user.img_url;
			this.twoFA = data.user.twoFA;
		})
		.catch(error => console.error('Fetch error:', error));
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
							<div id="presentNick">${this.nickname}</div>
						</div>
						<div id="edit-img">
							<div id="image-preview">
								<img id="presentImage" src="${this.img_url}" alt="Profile Image"></img>
							</div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">Enable 2FA:</label>
							${this.twoFA ? `<input type="checkbox" id="2fa-toggle" checked disabled>` : `<input type="checkbox" id="2fa-toggle" disabled>`}
						</div>
					</div>
					<div id="Arrow">
						<img id="arrowImg" src="/arrow.png"></img>
					</div>
					<div id="changedProfile">
						<div class="edit" id="edit-nick">
							<label for="nickname">Nickname:</label>
							<input type="text" id="nickname" value="${this.nickname}" autocomplete="off">
							<div id="nickname-error" class="error-message"></div>
						</div>
						<div  class="edit" id="edit-img">
							<div id="image-preview">
								<img id="profile-image" src="${this.img_url}" alt="Profile Image"></img>
							</div>
							<div id="file-upload-wrapper">
								<div id="custom-file-upload">
									<span>Click to choose a file</span>
								</div>
								<input type="file" id="file-upload" accept="image/*">
							</div>
							<div id="image-error" class="error-message"></div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">Enable 2FA:</label>
							${this.twoFA ? `<input type="checkbox" id="2fa-toggle" checked>` : `<input type="checkbox" id="2fa-toggle">`}
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

		this.addEvent('click', '#deleteButton', (event) => {
			document.getElementById('deleteDoubleCheck').style.display = 'flex';
		});

		this.addEvent('click', '#deleteNoButton', (event) => {
			document.getElementById('deleteDoubleCheck').style.display = 'none';
		});

		this.addEvent('click', '#deleteYesButton', (event) => {
			fetch(url, {
				method: 'DELETE',
				credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				changeUrl(`/`);
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
			const imgFile = document.getElementById('file-upload').files[0];
			const twoFA = document.getElementById('2fa-toggle').checked;

			// Create FormData object to send file and other data
			const formData = new FormData();
			formData.append('nickname', nickname);
			formData.append('twoFA', twoFA);
			if (imgFile) {
				formData.append('profileImage', imgFile);
			}

			// API!!
			fetch('주소', {
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
				if (!result.isValidNick) {
					document.getElementById('nickname-error').textContent = "nickname is invalid!";
				}
			
				// image가 유효하지 않으면 경고문 띄움
				if (!result.isValidImg) {
					document.getElementById('image-error').textContent = "image is invalid!";
				}
			
				if (result.isValidNick && result.isValidImg) {
					changeUrl(`/main/profile/${this.props.nickname}/edit`);
				}
			})
			.catch(error => {
				console.error('Error updating profile:', error);
			});
		});
	}
}