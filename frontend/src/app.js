import { initializeRouter, createRoutes } from "./core/router.js";
import { getCookie } from "./core/jwt.js";

class App {
	app;
	lan;
	constructor() {
		this.app = document.querySelector("#app");
		this.lan = { value: 0 };
		console.log("start!!");
		console.log(this.lan);
	}
}

export const root = new App();
export const routes = createRoutes(root);

const online = () => {
    const onlineSocket = new WebSocket(
        'ws://'
        + "localhost:8000"
        + '/ws/online/'
        );
        console.log(onlineSocket);
        onlineSocket.onopen = () => {
            const token = getCookie("jwt");
            onlineSocket.send(JSON.stringify({ 'action': 'authenticate', 'token': token }));
        };
        onlineSocket.onclose = () => {
            console.log("close");
            // 로그아웃
        };
    }
    
initializeRouter(routes);
online();