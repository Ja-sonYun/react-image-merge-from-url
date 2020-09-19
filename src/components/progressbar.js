import React from 'react';

class ProgressBar extends React.Component {
	render() {
		return (
			<div>
				{this.props.progress}
			</div>
		)
	}
}

export default ProgressBar;
