import React from 'react';
import './header.css';

class Header extends React.Component {
	render() {
		return (
			<div>
				<p id="main">Image Merger</p>
				<p id="description">Just put the url. This website will automatically download all images from given url and merge them as an one image file.</p>
			</div>
		)
	}
}

export default Header;
