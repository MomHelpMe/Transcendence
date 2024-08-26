export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
	else return null;
}

export function parseJWT()
{
	const token = getCookie("jwt");
	if (!token) return null;
	const parts = token.split('.');
	if (parts.length !== 3) return null;
	const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
	return payload;
}