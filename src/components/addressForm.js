import React from 'react';
import './addressForm.css';
import * as message from '../messages.js';
import { Button, CircularProgress, LinearProgress } from '@material-ui/core';

function ButtonComponent(props) {
	const { onClick, loading, lan } = props;
	return (
		<div id="buttonSection">
			<button onClick={onClick}><span>
			{loading && <CircularProgress size={14}/>}
			{!loading && message.MERGE_M()[lan]}
</span></button>
		</div>
	);
}

function validURL(str) {
	let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

class AddressForm extends React.Component {
	constructor() {
		super();
		this.state = {
			url: '',
			isValidURL: '',
		};

		this.wrapperRef = React.createRef();
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isValidURL[this.state.isValidURL.length-1] !== 't') {
			let lightStatus = this.state.isValidURL ? this.state.isValidURL + '-light' : '';
			this.setState({ isValidURL: lightStatus });
		}
	}

	regetStatus = () => {
		if(!this.state.isValidURL) {
			this.setState({ isValidURL: 'clicked' });
		} else {
			if(this.state.isValidURL[this.state.isValidURL.length-1] === 't') {
				this.setState({ isValidURL: this.state.isValidURL.slice(0, -6) });
			}
		}
	}

	sendURL = (event) => {
		if(validURL(event.target.value)) {
			this.setState({ isValidURL: 'valid' });
			this.props.adrf(event.target.value);
		} else {
			if(event.target.value === '') {
				this.setState({ isValidURL: '' });
			} else {
				this.setState({ isValidURL: 'invalid' });
			}
			this.props.adrf('');
		}
	}

	stepToPercentage = () => {
		if(this.props.progress[2] === 0) {
			return 0;
		}
		return (this.props.progress[0]/this.props.progress[2]) * 100;
	}

	m = (i) => {
		return i[this.props.lan];
	}

	render() {
		let progress = this.props.progress[2] === 0 ? 0 : (this.props.progress[0] / this.props.progress[2]) * 100;
		let isLoading = (progress < 100 && progress > 0) ? true : false;

		return (
			<div>
				<input onClick={this.regetStatus} ref={this.wrapperRef} placeholder={this.m(message.ENTER_URL_HERE())} className={this.state.isValidURL} type="text" onChange={this.sendURL}/>
				<br />
				<div id="progressSection">
					<ButtonComponent onClick={this.props.merge} loading={isLoading} lan={this.props.lan} />
					{ isLoading && <LinearProgress variant="determinate" value={this.props.progress[2]===0 ? 0 : progress}/>}
					<p id="progressInfo">{ this.props.progress[1] }</p>
				</div>
			</div>
		);
	};
}

export default AddressForm;
