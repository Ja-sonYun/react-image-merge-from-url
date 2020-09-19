import avoidSameOriginPolicyProblem from './avoid-same-origin-policy-problem.js';

const axios = require("axios");
// const cheerio = require("cheerio");

function validImageURLsFromString(str) {
	let pattern = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*\.(jpg|jpeg|png)/igm;
	const targetURL = str;
	return targetURL.match(pattern);
}

async function getHTML(url) {
	try {
		return await axios.get(avoidSameOriginPolicyProblem(encodeURIComponent(url), 'url'));
	} catch (error) {
		alert(error);
	}
}

function getMetaData(url) {
	return new Promise(function(resolve, reject) {
		let img = new Image();
		img.onload = function () {
			resolve([this.width, this.height]);
		};
		img.src = url;
	})
}

export function rawImageDataToImage(url) {
	return new Promise(function(resolve, reject) {
		axios.get(avoidSameOriginPolicyProblem(encodeURIComponent(url), 'raw'), {
			responseType: 'arraybuffer',
		}).then(response => {
			let blob = new Blob([response.data],
								{type: response.headers['content-type']});
			let imgUrl = URL.createObjectURL(blob);
			resolve(imgUrl);
		});
	})
}

export function getCanvasSize(metadatas) {
	let imageHeight = 0;
	let imageWidth = 0;
	metadatas.forEach((metadata) => {
		imageHeight += metadata[1];
		imageWidth = imageWidth < metadata[0] ? metadata[0] : imageWidth;
	});

	return [imageWidth, imageHeight];
}

export async function discoverURLs(url) {
	let validURLs;
	await getHTML(url).then(html => {
		validURLs = validImageURLsFromString(html.data.contents);
	});

	// drop duplicate links
	let urls = [];
	validURLs.forEach((item) => {
		if(urls.indexOf(item) < 0) {
			urls.push(item);
		}
	});

	return urls;
}

export async function getMetaDatas(urls) {
	let metaDatas = [];

	for(const url of urls) {
		await getMetaData(url).then(meta => {
			metaDatas.push(meta);
		})
	}

	return metaDatas;
}
