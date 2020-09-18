import React from 'react';

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
			isValidURL: false
		};
	}

	sendURL = (event) => {
		this.props.adrf(validURL(event.target.value) ? event.target.value : '');
	}

	render() {
		return (
			<div>
				<input type="text" onChange={this.sendURL}/>
			</div>
		);
	};
}

export default AddressForm;
