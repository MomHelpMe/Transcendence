import { initializeRouter } from "./core/router.js";
import { getCookie } from "./core/jwt.js";

class App {
    app;
    constructor() { this.app = document.querySelector("#app"); }
}

export const root = new App();

initializeRouter();

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
online();