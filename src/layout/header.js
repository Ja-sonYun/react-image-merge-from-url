import React from 'react';
import './header.css';
import * as message from '../messages.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Header extends React.Component {
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
			<div>
				<p id="abex"><a class="AbutBlack" href="https://abex.dev">abex.dev</a></p>
				<FormControl className="classes.formControl" id="lanSelection">
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
				<p id="main">Image Merger</p>
				<p id="description">{ message.DESCRIPTION()[this.props.lan] }</p>
			</div>
		)
	}
}

export default Header;
