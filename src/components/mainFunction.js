import React from 'react';
import AddressForm from './addressForm.js';
import ProgressBar from './progressbar.js';
import { getCanvasSize, rawImageDataToImage, discoverURLs, getMetaDatas } from './imageProcessing.js';
import mergeImages from 'merge-images';
import * as message from './messages.js';

class MainFunction extends React.Component {
	constructor() {
		super();
		this.state = {
			targetURL: '',
			imageURLs: [],
			imagesMeta: [],
			imageBackgroundColor: 'white',
			progress: [0, '', 0], // { step : 0, message : '' , end point : 0 } end point will setted up after finding image.
		};
	}

	updateProgress = (m, gotEndPoint=0) => {
		let ms = m[this.props.lan];
		if(this.state.progress[2] !== 0) { // When it got the end point of the progress, keep it in the array
			this.setState({ progress: [m['step'], ms, this.state.progress[2]] });
		} else { // First initialize of the end point.
			this.setState({ progress: [m['step'], ms, gotEndPoint] });
		}
	}

	// using this function from addressForm.js. passed from render>div>AddressForm as adrf.
	gotURL = (url) => {
		this.setState({ targetURL: url });
	}

	merge = () => {
		if(!this.state.targetURL) {
			this.updateProgress(message.WRONG_URL());
			return;
		}

		this.updateProgress(message.FINDING_IMG());

		// find image file links from target url
		discoverURLs(this.state.targetURL)
			.then(array => {
				if(array == null) {

					this.updateProgress(message.IMG_NOT_FOUND());

					return;
				}
				// set state after got all image file links
				this.setState({ imageURLs: array });

				// Send end point of the progress.
				this.updateProgress(message.IMGS_FOUND(array.length), message.getEndPoint(array.length));

				// get metadatas from image file links
				getMetaDatas(this.state.imageURLs).then(metadatas => {

					this.setState({ imagesMeta: metadatas });

					this.fetchImages().then((mergeImageArrayFormat) => {
						this.updateProgress(message.START_MERGE(this.state.imageURLs.length));
						mergeImages(mergeImageArrayFormat).then(b64 =>{
							let img = document.getElementById('new');
							img.onload = () => {
								this.updateProgress(message.ALL_DONE(this.state.imageURLs.length));
							}
							img.src = b64;
						});

					}).finally(() => {
						// ALL_DONE ( array length for keep step count. )
						this.updateProgress(message.DISPLAYING(this.state.imageURLs.length));
					});

				}).catch((error) => {
					this.updateProgress(message.IMG_NOT_FOUND());
				});
			})
			.catch((error) => {
				this.updateProgress(message.WRONG_URL());
			});
	}

	fetchImages = async () => {
		if(this.state.imageURLs.length !== this.state.imagesMeta.length) {
			this.updateProgress(message.SOMETHING_WRONG);
			return;
		}


		this.updateProgress(message.PP_BACK());

		// set background image
		let canvasSize = getCanvasSize(this.state.imagesMeta);
		let canvas = document.createElement("CANVAS");
		canvas.width = canvasSize[0];
		canvas.height = canvasSize[1];
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = this.state.imageBackgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		let lastImagePos = 0;
		let mergeImageArrayFormat = [{ src: canvas.toDataURL(), x:0, y:0 }];

		for(let i = 0; this.state.imageURLs.length > i; i++) {

			this.updateProgress(message.GETTING_IMG(i+1, this.state.imageURLs.length));

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

				<AddressForm adrf={this.gotURL} merge={this.merge} progress={this.state.progress}/>

				<img src="" id="new"/>
			</div>
		);
	};
}

export default MainFunction;
