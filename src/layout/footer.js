import React from 'react';
import footer from './footer.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class Footer extends React.Component {
	constructor() {
		super();
		this.state = {
			lan: 'en',
			isOpen: false,
		}
	}

	handleChange = (event) => {
		this.props.setLan(event.target.value);
		this.setState({ lan: event.target.value });
	}

	ToggleLangMenu = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		return (
			<div id="footer">
				<h3 className="footer-content">By Jasonyun <a href="https://github.com/Ja-sonYun">Github</a> | <a href="https://abex.dev">ABEX</a></h3>
				<p className="footer-links">used <a href="https://allorigins.win/">all origin</a>'s api to avoid same-origin policy problems.
				<br />
				Source Code of this page(github) : <a href="https://github.com/Ja-sonYun/react-image-merge-from-url">here</a>
				</p>
				<FormControl className="classes.formControl" id="lanSelection">
					<InputLabel id="lanSelect-label">Language</InputLabel>
					<Select
						labelId="lanSelect-label"
						id="lanSelect"
						open={this.state.isOpen}
						onClose={this.ToggleLangMenu}
						onOpen={this.ToggleLangMenu}
						value={this.state.lan}
						onChange={this.handleChange}>
						<MenuItem value="en">
							<em>en</em>
						</MenuItem>
						<MenuItem value="ko">ko</MenuItem>
						<MenuItem value="jp">jp</MenuItem>
					</Select>
				</FormControl>
			</div>
		);
	};
}

export default Footer;
