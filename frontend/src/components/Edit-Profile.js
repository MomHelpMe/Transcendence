import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class EditProfile extends Component {

	translate() {
		const languages = {
			0: {
				headText: "Edit Profile",
				nickText: "Nickname",
				urlText: "Image URL",
				twofaText: "Enable 2FA",
				saveText: "Save Changes",
				deleteText: "Delete Account",
				deleteMsgText: "Are you sure you want to delete your account?",
				yesText: "Yes",
				noText: "No"
			},
			1: {
				headText: "프로필 수정",
				nickText: "닉네임",
				urlText: "이미지 URL",
				twofaText: "2단계 인증 활성화",
				saveText: "변경 사항 저장",
				deleteText: "계정 삭제",
				deleteMsgText: "계정을 정말 삭제하시겠습니까?",
				yesText: "예",
				noText: "아니요"
			},
			2: {
				headText: "プロフィール編集",
				nickText: "ニックネーム",
				urlText: "画像URL",
				twofaText: "2FAを有効にする",
				saveText: "変更を保存",
				deleteText: "アカウント削除",
				deleteMsgText: "本当にアカウントを削除しますか？",
				yesText: "はい",
				noText: "いいえ"
			}
		};
		this.translations = languages[this.props.lan.value];
	}

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
		const translations = this.translations;
		return `
			<div id="edit-box">
				<div id="deleteButton">${translations.deleteText}</div>
				<div id="deleteDoubleCheck">
					<div id="deleteAlertMsg">
						${translations.deleteMsgText}
					</div>
					<div id="deleteChoiceBox">
						<div id="deleteYesButton">${translations.yesText}</div>
						<div id="deleteNoButton">${translations.noText}</div>
					</div>
				</div>
				<img src="/img/back.png" id="goBack"></img>
				<div id="editTitle">
					${translations.headText}
				</div>
				<div id="editContents">
					<div id="prevProfile">
						<div id="edit-nick">
							<label for="nickname">${translations.nickText}:</label>
							<div id="presentNick">${this.state.nickname}</div>
						</div>
						<div id="edit-img">
							<div id="image-preview">
								<img id="presentImage" src="${this.state.img_url}" alt="Profile Image"></img>
							</div>
							<div id="url-upload-wrapper">
								<label for="image-url">${translations.urlText}</label>
								<input type="text" class="profile-image-url" value="${this.state.img_url}" placeholder="Enter image URL" readonly>
							</div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">${translations.twofaText}:</label>
							${this.state.is_2FA ? `<input type="checkbox" checked disabled>` : `<input type="checkbox" disabled>`}
						</div>
					</div>
					<div id="Arrow">
						<img id="arrowImg" src="/img/arrow.png"></img>
					</div>
					<div id="changedProfile">
						<div class="edit" id="edit-nick">
							<label for="nickname">${translations.nickText}:</label>
							<input type="text" id="nickname" value="${this.state.nickname}" autocomplete="off" maxlength="10">
						</div>
						<div class="edit" id="edit-img">
							<div id="image-preview">
								<img id="profile-image" src="${this.state.img_url}" alt="Profile Image"></img>
							</div>
							<div id="url-upload-wrapper">
								<label for="image-url">${translations.urlText}</label>
								<input type="text" class="profile-image-url" id="image-url" value="${this.state.img_url}" placeholder="Enter image URL">
							</div>
						</div>
						<div id="edit-2FA">
							<label for="2fa-toggle">${translations.twofaText}:</label>
							${this.state.is_2FA ? `<input type="checkbox" id="2fa-toggle" checked>` : `<input type="checkbox" id="2fa-toggle">`}
						</div>
						<button id="profileChange" type="submit">${translations.saveText}</button>
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
			
			// Fetch the values
			const nickname = document.getElementById('nickname').value;
			const imageUrl = document.getElementById('image-url').value;
			const is_2FA = document.getElementById('2fa-toggle').checked;	

			console.log(nickname);
			console.log(imageUrl);
			console.log(is_2FA);

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
				changeUrl(`/main/profile/${this.props.uid}/edit`);
			})
			.catch(error => {
				console.error('Error updating profile:', error);
			});
		});
	}
}
