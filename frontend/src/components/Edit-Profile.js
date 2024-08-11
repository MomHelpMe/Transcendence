import { Component } from "../core/Component.js";

export class EditProfile extends Component {

  template () {
	this.nickname = "seonjo";
	this.img_url = "/friends.png";
	this.TwoFA = false;
    return `
		<div id="edit-box">
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
						${this.TwoFA ? `<input type="checkbox" id="2fa-toggle" checked disabled>` : `<input type="checkbox" id="2fa-toggle" disabled>`}
					</div>
				</div>
				<div id="Arrow">
					<img id="arrowImg" src="/arrow.png"></img>
				</div>
				<div id="changedProfile">
					<div class="edit" id="edit-nick">
						<label for="nickname">Nickname:</label>
						<input type="text" id="nickname" value="${this.nickname}">
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

			document.getElementById('nickname-error').textContent = "nickname is invalid!";
			document.getElementById('image-error').textContent = "image is invalid!"

		// 	try {
		// 		const response = await fetch('https://your-backend-api.com/api/update-profile', {
		// 		  method: 'POST',
		// 		  body: formData
		// 		});
		
		// 		if (response.ok) {
		// 		  const result = await response.json();
		
		// 		  // Handle validation results
		// 		  if (!result.nicknameValid) {
		// 			document.getElementById('nickname-error').textContent = result.message.nickname;
		// 		  }
		
		// 		  if (!result.imageValid) {
		// 			document.getElementById('image-error').textContent = result.message.image;
		// 		  }
		
		// 		  if (result.nicknameValid && result.imageValid) {
		// 			console.log('Profile updated successfully:', result);
		// 			// 성공적인 업데이트 후의 추가 작업 (예: 메시지 표시, 리다이렉트 등)
		// 		  }
		
		// 		} else {
		// 		  console.error('Failed to update profile. Status:', response.status);
		// 		}
		// 	  } catch (error) {
		// 		console.error('Error updating profile:', error);
		// 	  }
		  });
	}
}