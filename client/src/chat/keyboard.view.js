import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { sendChatMessage } from './ducks';
import styles from './styles';

function KeyboardUI({ active, onChange, value }) {
    return active ? (
        <div style={styles.keyboard}>
            <input type="text" style={styles.input} autoFocus onChange={onChange} value={value} />
        </div>
    ) : null;
}

KeyboardUI.propTypes = {
    active: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,

    value: PropTypes.string.isRequired,
};

class Keyboard extends React.Component {
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
            if (this.state.active) {
                this.props.sendMessage(this.state.message);
                this.setState({ message: '' });
            } else {
                // this.inputRef.focus(); @todo
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

Keyboard.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default connect(
    null,
    dispatch => ({
        sendMessage(message) {
            dispatch(sendChatMessage(message));
        },
    }),
)(Keyboard);
