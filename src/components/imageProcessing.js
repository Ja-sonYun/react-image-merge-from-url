import mergeImages from 'merge-images';

const axios = require("axios");
// const cheerio = require("cheerio");

function validImageURLsFromString(str) {
	let pattern = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*\.(jpg|jpeg|png)/igm;
	const targetURL = str;
	return targetURL.match(pattern);
}

// function list2KeyValueList(list, foreword) {
//     let returnList = [];
//     for (let i = 0; i < list.length; i++) {
//         let obj = {};
//         let key = foreword + '-' + i;
//         obj[key] = list[i];
//         returnList.push(obj);
//     }
//     console.log(returnList);
//     return returnList;
// }

async function getHTML(url) {
	const allOriginsAPI = 'https://api.allorigins.win/get?url=';
	// allOrigins => https://allorigins.win/
	// Pull contents from any page via API (as JSON/P or raw) and avoid Same-origin policy problems.

	try {
		return await axios.get(allOriginsAPI + encodeURIComponent(url));
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

function getCanvasSize(metadatas) {
	let imageHeight = 0;
	let imageWidth = 0;
	metadatas.forEach((metadata) => {
		imageHeight += metadata[1];
		imageWidth = imageWidth < metadata[0] ? metadata[0] : imageWidth;
	});

	return [imageWidth, imageHeight];
}

export function merge(urls, metas) {
	console.log(metas);
	if(urls.length != metas.length) {
		alert('something wrong!!!!');
		return;
	}

	// set background image
	let canvasSize = getCanvasSize(metas);
	let canvas = document.createElement("CANVAS");
	canvas.width = canvasSize[0];
	canvas.height = canvasSize[1];
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	let lastImagePos = 0;
	let mergeImageArrayFormat = [{ src: canvas.toDataURL(), x:0, y:0 }];

	for(let i = 0; urls.length > i; i++) {
		mergeImageArrayFormat.push({ src: urls[i], x: 0, y: lastImagePos})
		lastImagePos += metas[i][1];
	}
	console.log(mergeImageArrayFormat);

	mergeImages(mergeImageArrayFormat, {
		crossOrigin: 'anonymous',
	}).then(b64 => document.getElementById('new').src = b64);
}

export function getImages(url) {
	return 'yes';
};

export async function discoverURLs(url) {
	let validURLs;
	await getHTML(url).then(html => {
		validURLs = validImageURLsFromString(html.data.contents);
		console.log(html.data.contents);
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
		let meta = await getMetaData(url);
		metaDatas.push(meta);
	}

	return metaDatas;
}
