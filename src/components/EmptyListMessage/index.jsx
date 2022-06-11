import React from 'react';
import './styles.css';

const EmptyResultMessage = ({ message = 'Nothing to show!' }) => {
	return <div className="empty-result-message">{message}</div>;
};

export default EmptyResultMessage;
