import React from 'react';
import './header.css';
import * as message from '../messages.js';

class Header extends React.Component {
	render() {
		return (
			<div>
				<p id="main">Image Merger</p>
				<p id="description">{ message.DESCRIPTION()[this.props.lan] }</p>
			</div>
		)
	}
}

export default Header;
