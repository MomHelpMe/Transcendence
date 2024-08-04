import { Component } from "../core/Component.js";
import { changeUrl } from "../core/router.js";

export class Login extends Component {

  template () {
    return `
		<div id="loginBox">
			<p id="login">LOGIN</p>
		</div>
    `;
  }

  setEvent () {
    this.addEvent('click', '#login', () => {
      // 로그인 요청
      window.location.href = 'http://localhost:8000/api/login';
    });

    // 유효성 검사 요청
    this.checkAuth();
  }

  checkAuth() {
    fetch('http://localhost:8000/api/validate', {
      method: 'GET',
      credentials: 'include', // 쿠키를 포함하여 요청
    })
    .then(response => response.json())
    .then(data => {
      if (data.isValid) {
        changeUrl('/main');
      } else {
        console.error('Authentication failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}
