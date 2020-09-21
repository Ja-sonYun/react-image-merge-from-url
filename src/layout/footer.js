import React from 'react';
import footer from './footer.css';

class Footer extends React.Component {
	render() {
		return (
			<div id="footer">
				<h3 className="footer-content">By Jasonyun <a href="https://github.com/Ja-sonYun">Github</a> | <a href="https://abex.dev">ABEX</a></h3>
				<p className="footer-links">used <a href="https://allorigins.win/">all origin</a>'s api to avoid same-origin policy problems.
				<br />
				Source Code of this page(github) : <a href="https://github.com/Ja-sonYun/react-image-merge-from-url">here</a>
				</p>
			</div>
		);
	};
}

export default Footer;
