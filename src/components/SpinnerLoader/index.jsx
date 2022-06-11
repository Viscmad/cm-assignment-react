import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SpinnerLoader = ({ className = '', message = 'Loading...', ...rest }) => {
	return (
		<div className={`loading ${className}`} {...rest}>
			<div className="loading__spinner" />
			<div className="loading__text">{message}</div>
		</div>
	);
};

SpinnerLoader.prototype = {
	className: PropTypes.string,
	message: PropTypes.string,
};

export default SpinnerLoader;
