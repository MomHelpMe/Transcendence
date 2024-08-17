import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class TwoFA extends Component {

	template () {
		return `
			<div id="TwoFAbody">
				<div id="TwoFAcontainer">
					<h1 id="TwoFA">Email Verification</h1>
					<p id="TwoFA">Please enter the verification code sent to your email:</p>
					<form id="verificationForm" autocomplete="off">
						<div class="code-inputs">
							<input type="text" id="digit1" maxlength="1" required autocomplete="off">
							<input type="text" id="digit2" maxlength="1" required autocomplete="off">
							<input type="text" id="digit3" maxlength="1" required autocomplete="off">
							<input type="text" id="digit4" maxlength="1" required autocomplete="off">
							<input type="text" id="digit5" maxlength="1" required autocomplete="off">
							<input type="text" id="digit6" maxlength="1" required autocomplete="off">
						</div>
						<button class="Button2FA" id="submit2FA" type="submit">Verify</button>
					</form>
					<button class="Button2FA" id="resendButton">Resend Code</button>
					<p id="message2FA"></p>
				</div>
			</div>
		`;
	}

	setEvent () {
		this.addEvent('input', '.code-inputs input', (event) => {
			const input = event.target;
			if (input.value.length === 1) {
				const nextInput = input.nextElementSibling;
				if (nextInput) {
					nextInput.focus();
				}
			}
		});

		this.addEvent('keydown', '.code-inputs input', (event) => {
			const input = event.target;
			if (event.key === 'Backspace' && input.value === '' && input.previousElementSibling) {
				input.previousElementSibling.focus();
			}
		});

		this.addEvent('click', '#resendButton', () => {
			// resend msg 전송
			fetch('http://localhost:80/api/send-mail/',{
				method: 'GET',
				credentials: 'include', // 쿠키를 포함하여 요청
			})
			.then(response => {
				if (response.status == 200) {
					console.log("Resend 성공");
				}
				else
					changeUrl("/", false);
			});
		});

		this.addEvent('submit', '#verificationForm', (event) => {
			event.preventDefault();
			let otpCode = '';
			for (let i = 1; i <= 6; i++) {
				otpCode += document.getElementById('digit' + i).value;
			}
			
			// API code 일치 확인 요청
			fetch('http://localhost:80/api/verify-otp/', {
				method: 'POST',
				credentials: 'include', // 쿠키를 포함하여 요청
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ otp_code: otpCode })
			})
			.then(response => {
				if (response.status == 200) return response.json();
				else return null;
			})
			.then(data => {
				if (data){
					if (data.success) {
						// OTP 인증 성공
						//message.textContent = 'Verification successful!';
						//message.style.color = 'green';
						console.log("code good!");
						changeUrl('/main'); // 메인 페이지로 이동
					} else {
						//message.textContent = 'Invalid code. Please try again.';
						console.error('OTP 인증 실패:', data.message);
					}
				} else {
					changeUrl("/", false);
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
		});
	}
}
