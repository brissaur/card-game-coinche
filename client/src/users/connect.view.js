import React from 'react';
import PropTypes from 'prop-types';

export default function UserConnect({ onChangeValue, onUserConnect }) {
    return (
        <div>
            <label htmlFor="user_connect">
                Quel est votre nom
                <input type="text" id="user_connect" onChange={onChangeValue} />
            </label>
            <input type="submit" value="Valider" onClick={onUserConnect} />
        </div>
    );
}

UserConnect.propTypes = {
    onUserConnect: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
};
