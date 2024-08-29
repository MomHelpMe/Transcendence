import { initializeRouter, createRoutes, changeUrl } from "./core/router.js";
import { getCookie } from "./core/jwt.js";


class App {
	app;
	lan;
	constructor() {
		this.app = document.querySelector("#app");
		this.lan = { value: 0 };
		fetch("https://localhost:443/api/language/", {
			method: 'GET',
			credentials: 'include', // 쿠키를 포함하여 요청 (사용자 인증 필요 시)
		})
		.then(response => {
			if (!response.ok){
				return null;
			} 
			return response.json();
		})
		.then(data => {
			if (data) this.lan.value = data.language;
		});
	}
}

export const root = new App();
export const routes = createRoutes(root);

const online = () => {
	const onlineSocket = new WebSocket(
		'wss://'
		+ "localhost:443"
		+ '/ws/online/'
		);
		console.log(onlineSocket);
		onlineSocket.onopen = () => {
			const token = getCookie("jwt");
			onlineSocket.send(JSON.stringify({ 'action': 'authenticate', 'token': token }));
		};
		onlineSocket.onclose = () => {
			console.log("online socket closed");
			changeUrl("/404", false);
		};
	}
	
initializeRouter(routes);
online();