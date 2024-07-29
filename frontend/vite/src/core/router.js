import { Home } from "../components/Home.js";
import { root } from "../app.js";
import { Main } from "../components/Main.js";

export const routes = {
    "/": () => { return new Home(root.app) },
    "/index.html": () => { return new Home(root.app) },
    "/main": () => { return new Main(root.app) },
};

export const changeUrl = (requestedUrl) => {
    console.log(`pushState : ${requestedUrl}`);
    history.pushState(null, null, requestedUrl);
    const component = routes[requestedUrl];
    if (component) {
        component();
    } else {
        console.error(`No route found for ${requestedUrl}`);
    }
};

export const initializeRouter = () => {
    window.addEventListener("popstate", () => {
        const component = routes[window.location.pathname];
        if (component) {
            component();
        } else {
            console.error(`No route found for ${window.location.pathname}`);
        }
    });
    const initialComponent = routes[window.location.pathname] || routes["/"];
    initialComponent();
};