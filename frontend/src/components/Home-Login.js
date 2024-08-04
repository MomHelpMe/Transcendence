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
      // 백엔드 서버의 로그인 엔드포인트로 리디렉션
      window.location.href = 'http://localhost:8000/api/login';
      changeUrl('/login');
    });
  }
}
