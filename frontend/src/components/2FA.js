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

	this.addEvent('click', '#resendButton', (event) => {
		// resend msg 전송
		// ok -> 다시 입력
		// false -> login으로 redirect (changeUrl("/", false))
	});

	this.addEvent('submit', '#verificationForm', (event) => {
		event.preventDefault();
		let code = '';
		for (let i = 1; i <= 6; i++) {
			code += document.getElementById('digit' + i).value;
		}
	  
		// API code 일치 확인 요청
		const actualCode = '123456'; // 실제로는 서버에서 가져와야 합니다.
		
		const message = document.querySelector('#message2FA');
		if (code === actualCode) {
			message.textContent = 'Verification successful!';
			message.style.color = 'green';
			changeUrl('/main');
		} else {
			message.textContent = 'Invalid code. Please try again.';
		}
	});
  }
}