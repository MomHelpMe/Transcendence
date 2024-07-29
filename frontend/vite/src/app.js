import { initializeRouter } from "./core/router.js";

class App {
    app;
    constructor() { this.app = document.querySelector("#app"); }
    clean() {
        const newApp = root.app.cloneNode(true);
        root.app.replaceWith(newApp);
        root.app = newApp;
    }
}

export const root = new App();

initializeRouter();