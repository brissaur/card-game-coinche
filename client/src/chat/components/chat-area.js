import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getChatMessages } from '../selectors';
import styles from './styles';
import ChatMessage from './message';

function ChatAreaComponent({ messages }) {
    return messages.length ? (
        <div style={styles.chatArea}>
            {messages.map(message => (
                <ChatMessage {...message} key={message.text} />
            ))}
        </div>
    ) : null;
}

ChatAreaComponent.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        playerId: PropTypes.string,
    })),
};

const ChatArea = connect(state => ({ messages: getChatMessages(state) }))(ChatAreaComponent);

export default ChatArea;
