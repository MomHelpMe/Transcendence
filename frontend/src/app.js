import { initializeRouter, createRoutes, changeUrl } from "./core/router.js";
import { getCookie } from "./core/jwt.js";


class App {
	app;
	lan;
	constructor() {
		this.app = document.querySelector("#app");
		this.lan = { value: 0 };
		// API!!! jwt가 있으면 해당 유저의 데이터베이스에서 언어 번호 (0 or 1 or 2) 얻어오기
		// fetch
		// if (respose.ok) {
		//	this.lan.value = data.value;
		// }
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