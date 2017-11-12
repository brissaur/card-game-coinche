import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserConnect extends Component {
    render() {
        const { onUserConnect, onChangeValue } = this.props;

        return (
            <div>
                <label htmlFor="user_connect">Quel est votre nom</label>
                <input type="text" id="user_connect" onChange={onChangeValue} />
                <input type="submit" value="Valider" onClick={onUserConnect} />
            </div>
        );
    }
}

export default UserConnect;

UserConnect.propTypes = {
    onUserConnect: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
};
