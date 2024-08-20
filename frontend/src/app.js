import { initializeRouter, createRoutes } from "./core/router.js";

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

initializeRouter(routes);