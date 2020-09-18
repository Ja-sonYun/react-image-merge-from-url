import React from 'react';
import AddressForm from './addressForm.js';
import { merge, discoverURLs, getMetaDatas } from './imageProcessing.js';

class Translator extends React.Component {
	constructor() {
		super();
		this.state = {
			targetURL: '',
			imageCount: 0,
			imageURLs: [],
			imageMetas: [],
		};
	}

	// using this function from addressForm.js. passed from render>div>AddressForm as adrf.
	gotURL = (url) => {
		this.setState({ targetURL: url });
	}

	getImageFromURL = () => {
		if(!this.state.targetURL) {
			alert('no url entered.');
			return;
		}

		// find image file links from target url
		discoverURLs(this.state.targetURL)
			.then(array => {
				if(array == null) {
					alert('no image found.');
					return;
				}
				// set state after got all image file links
				this.setState({ imageURLs: array });
				// get metadatas from image file links
				getMetaDatas(this.state.imageURLs).then(array => {
					this.setState({ imageMetas: array });
					alert("start merging");
					merge(this.state.imageURLs, this.state.imageMetas);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	showImages = () => {
		if(this.state.imageURLs.length > 0){
			let imageCount = 0;
			// < img src - id - key /> imageCount++ must come at last to make id and key's values are same
			return (
				<span>
					{this.state.imageURLs.map((url) =>
						<img src={url} id={ "img-" + imageCount } key={ "img-" + imageCount++ } />
					)}
					<p>got { imageCount } images.</p>
				</span>
			);
		}
	}

	render() {
		return (
			<div>
				{this.state.targetURL ? 'true' : ''}
				<AddressForm adrf={this.gotURL} />
				<button onClick={this.getImageFromURL}>click</button>
				<img src="" id="new"/>
			</div>
		);
	};
}

export default Translator;
