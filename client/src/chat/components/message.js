import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

function ChatMessage({ text, playerId }) {
    return (
        <div className="animated fadeOut">
            <span>{playerId}:</span>
            <span>{text}</span>
        </div>
    );
}

ChatMessage.propTypes = {
    text: PropTypes.string,
    playerId: PropTypes.string,
};

export default ChatMessage;
