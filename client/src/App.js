import React from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';
import UserConnect from './user/connect.container';

import { getAppLoadedStatus } from './bootstrap/selectors';
import { getUserName, getUserId } from './user/selectors';

function mapStateToProps(state) {
    const { isLoaded, error } = getAppLoadedStatus(state);

    return {
        isLoaded,
        error,
        username: getUserName(state),
        id: getUserId(state),
    };
}
const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch({ type: 'TEST_ACTION', payload: {} });
    },
});

function App({ isLoaded, error, username, id }) {
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>Hello {username} with id {id}</div>
            <Board />
            <UserConnect />
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
