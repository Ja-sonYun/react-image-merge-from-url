// allOrigins => https://allorigins.win/
// Pull contents from any page via API (as JSON/P or raw) and avoid Same-origin policy problems.

const ASOPP_URL = 'https://api.allorigins.win/get?url=';

const ASOPP_RAW = 'https://api.allorigins.win/raw?url=';

// param => target url and url or raw
export default function avoidSameOriginPolicyProblem(url, type) {
	if(type === "url") {
		return ASOPP_URL + url;
	} else if(type === "raw") {
		return ASOPP_RAW + url;
	} else {
		console.error("wrong parameter!")
	}
}
