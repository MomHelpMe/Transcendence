import { initializeRouter } from "./core/router.js";

class App {
    app;
    constructor() { this.app = document.querySelector("#app"); }
}

export const root = new App();

initializeRouter();