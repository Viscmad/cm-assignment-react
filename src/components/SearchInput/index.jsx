import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import './style.css';

const SearchInput = ({ onChange, placeholder = 'Search', ...rest }) => {
	const debounceDelay = 800;
	const handleInputChange = debounce(
		({ target }) => onChange(target.value),
		debounceDelay
	);
	return (
		<input placeholder={placeholder} {...rest} onInput={handleInputChange} />
	);
};

SearchInput.prototype = {
	className: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
};

export default SearchInput;
