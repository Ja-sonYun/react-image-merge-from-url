import React from 'react';
import AddressForm from './addressForm.js';
import ProgressBar from './progressbar.js';
import { getCanvasSize, rawImageDataToImage, discoverURLs, getMetaDatas } from './imageProcessing.js';
import mergeImages from 'merge-images';

class Translator extends React.Component {
	constructor() {
		super();
		this.state = {
			targetURL: '',
			imageURLs: [],
			imagesMeta: [],
			progress: '',
		};
	}

	updateProgress = (p) => {
		this.setState({ progress: p });
	}

	// using this function from addressForm.js. passed from render>div>AddressForm as adrf.
	gotURL = (url) => {
		this.setState({ targetURL: url });
	}

	merge = () => {
		if(!this.state.targetURL) {
			this.updateProgress('PLEASE ENTER A CORRECT URL');
			return;
		}

		this.updateProgress('FINDING IMAGES FROM GIVEN URL...');

		// find image file links from target url
		discoverURLs(this.state.targetURL)
			.then(array => {
				if(array == null) {

					this.updateProgress('IMAGE NOT FOUND FROM GIVEN URL');

					return;
				}
				// set state after got all image file links
				this.setState({ imageURLs: array });

				this.updateProgress(array.length + ' IMAGES FOUND AND GETTING METADATAS...');

				// get metadatas from image file links
				getMetaDatas(this.state.imageURLs).then(metadatas => {

					this.setState({ imagesMeta: metadatas });

					this.updateProgress('DONE! START TO MERGE');

					this.fetchImages().then((mergeImageArrayFormat) => {
						mergeImages(mergeImageArrayFormat).then(b64 => document.getElementById('new').src = b64);

					}).finally(() => {
						this.updateProgress('ALL DONE!');
					});

				}).catch((error) => {
					console.log(error)
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchImages = async () => {
		if(this.state.imageURLs.length !== this.state.imagesMeta.length) {
			this.updateProgress('SOMETHING WRONG!');
			return;
		}


		this.updateProgress('PREPARING BACKGROUND IMAGE...');

		// set background image
		let canvasSize = getCanvasSize(this.state.imagesMeta);
		let canvas = document.createElement("CANVAS");
		canvas.width = canvasSize[0];
		canvas.height = canvasSize[1];
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		let lastImagePos = 0;
		let mergeImageArrayFormat = [{ src: canvas.toDataURL(), x:0, y:0 }];

		for(let i = 0; this.state.imageURLs.length > i; i++) {

			this.updateProgress('GETTING IMAGE FROM URL... (' + (i+1) + '/' + this.state.imageURLs.length + ')');

			await rawImageDataToImage(this.state.imageURLs[i]).then(convertedURL => {
				mergeImageArrayFormat.push({ src: convertedURL, x: 0, y: lastImagePos})
				lastImagePos += this.state.imagesMeta[i][1];
			});
		}

		return mergeImageArrayFormat;
	}

	render() {
		return (
			<div>
				<ProgressBar progress={this.state.progress}/>

				{this.state.targetURL ? 'true' : ''}

				<AddressForm adrf={this.gotURL} />
				<button onClick={this.merge}>click</button>
				<img src="" id="new"/>
			</div>
		);
	};
}

export default Translator;
