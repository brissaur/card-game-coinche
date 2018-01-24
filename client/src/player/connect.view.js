import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerConnect({ onChangeValue, onPlayerConnect }) {
    return (
        <div>
            <label htmlFor="player_connect">
                Quel est votre nom
                <input type="text" id="user_connect" onChange={onChangeValue} />
            </label>
            <input type="submit" value="Valider" onClick={onPlayerConnect} />
        </div>
    );
}

PlayerConnect.propTypes = {
    onUserConnect: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
};
