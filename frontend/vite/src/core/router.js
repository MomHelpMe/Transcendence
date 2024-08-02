import { Home } from "../components/Home.js";
import { root } from "../app.js";
import { Main } from "../components/Main.js";
import { Friends } from "../components/Friends.js";
import { Profile } from "../components/Profile.js";

export const routes = {
    "/": {
        component: () => new Home(root.app),
        props: {}
    },
    "/main": {
        component: () => new Main(root.app),
        props: {}
    },
    "/main/friends": {
        component: () => new Friends(root.app),
        props: {}
    },
    "/main/profile/:nickname": {
        component: (props) => new Profile(root.app, props),
        props: { nickname: "" }
    }
};

export const changeUrl = (requestedUrl) => {
    if (window.location.pathname !== requestedUrl) {
        console.log(`pushState : ${requestedUrl}`);
        history.pushState(null, null, requestedUrl);
    }
    parsePath(requestedUrl);
};

export function parsePath(path) {
    const routeKeys = Object.keys(routes);
    for (const key of routeKeys) {
        const route = routes[key];
        const regex = new RegExp('^' + key.replace(/:\w+/g, '([\\w-]+)') + '$');
        const match = path.match(regex);
        if (match) {
            const props = { ...route.props };
            const values = match.slice(1);
            const keys = key.match(/:\w+/g) || [];
            keys.forEach((key, index) => {
                props[key.substring(1)] = values[index];
            });
            route.component(props);
            return;
        }
    }
    console.error(`No route found for ${path}`);
}

export const initializeRouter = () => {
    window.addEventListener("popstate", () => {
        parsePath(window.location.pathname);
    });
    parsePath(window.location.pathname);
};