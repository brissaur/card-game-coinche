import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { sendChatMessage } from '../ducks';
import KeyboardUI from './keyboard';

class KeyboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            message: '',
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    onInputChange(e) {
        this.setState({ message: e.target.value });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (this.state.active && this.state.message) {
                this.props.sendMessage(this.state.message);
                this.setState({ message: '' });
            }
            this.setState({ active: !this.state.active });
            // @todo: submit
        } else if (e.key === 'Escape') {
            this.setState({ active: false });
        }
    }

    render() {
        return (
            <KeyboardUI
                active={this.state.active}
                onChange={this.onInputChange}
                value={this.state.message}
            />
        );
    }
}

KeyboardComponent.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

const Keyboard = connect(
    null,
    dispatch => ({
        sendMessage(message) {
            dispatch(sendChatMessage(message));
        },
    }),
)(KeyboardComponent);

export default Keyboard;
