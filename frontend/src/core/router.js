import { Home } from "../components/Home.js";
import { root } from "../app.js";
import { Main } from "../components/Main.js";
import { Friends } from "../components/Friends.js";
import { Profile } from "../components/Profile.js";
import { TwoFA } from "../components/2FA.js";

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
    },
	"/2FA": {
		component: () => new TwoFA(root.app),
        props: {}
	}
};

export const changeUrl = async (requestedUrl, usePushState = true) => {
    if (window.location.pathname !== requestedUrl) {
        console.log(`${usePushState ? 'pushState' : 'replaceState'} : ${requestedUrl}`);
        if (usePushState) {
            history.pushState(null, null, requestedUrl);
        } else {
            history.replaceState(null, null, requestedUrl);
        }
    }
    await parsePath(requestedUrl);
};

export async function parsePath(path) {
	const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code')) {
        const code = urlParams.get('code');
        
		// code 보내고 2FA 여부 확인!! (추가 부분!!)
        fetch('http://localhost:8000/api/callback/', {
            method: 'POST',
            credentials: 'include', // 쿠키를 포함하여 요청
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        })
        .then(response => {

            // 처음 받은 response 에는 200 그 뒤로 계속 401
            console.log(`Response status: ${response.status}`);


            if (response.status == 200)
                return response.json();
            else
                return null;
        })
        .then(data => {

            console.log(`data: ${data.is_2FA}`);

            if (data){
                if (data.is_2FA) {
                    // email 전송 요청
                    fetch('http://localhost:8000/api/send-mail/',{
                        method: 'GET',
                        credentials: 'include', // 쿠키를 포함하여 요청
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.status == 200)
                            return changeUrl("/2FA", false);
                        else
                            return changeUrl("/", false);
                    });
                } else {
                    return changeUrl("/main", false);
                }
            }
            else return changeUrl("/", false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
		return ;
    }

    //const isAuthenticated = await checkAuth();
    //if ((path === "/" || path === "/2FA") && isAuthenticated) {
    //    return changeUrl("/main", false);  // /로 이동할 때 인증되어 있으면 /main으로 이동, replaceState 사용
    //} else if ((path !== "/" && path !== "/2FA") && !isAuthenticated) {
    //    return changeUrl("/", false);  // /를 제외한 다른 경로로 이동할 때 인증되지 않은 경우 /로 이동, replaceState 사용
    //}

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
    window.addEventListener("popstate", async () => {
        await parsePath(window.location.pathname);
    });
    parsePath(window.location.pathname);
};

//async function checkAuth() {
//    try {
//        const response = await fetch('http://localhost:8000/api/validate', {
//            method: 'GET',
//            credentials: 'include', // 쿠키를 포함하여 요청
//        });
//        const data = await response.json();
//        return data.isValid;
//    } catch (error) {
//        console.error('Error:', error);
//        return false;
//    }
//}
