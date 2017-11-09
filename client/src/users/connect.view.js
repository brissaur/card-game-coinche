import React, { Component } from 'react';

class UserConnect extends Component {
    render() {
        const { onUserConnect } = this.props
        return (
            <div>
                <label htmlFor="user_connect">Quel est votre nom</label>
                <input type="text" id="user_connect"/>
                <input type="submit" value="Valider" onClick={onUserConnect} />
            </div>
        )
    }
}

export default UserConnect