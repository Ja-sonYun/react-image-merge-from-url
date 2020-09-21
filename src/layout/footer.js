import React from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import footer from './footer.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

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
				<h3 className="footer-content">by jason</h3>
				<FormControl className="classes.formControl">
					<InputLabel id="lanSelect-label">Lan</InputLabel>
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
