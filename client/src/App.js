import React from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';
import UserConnect from './users/connect.container';

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch({ type: 'TEST_ACTION', payload: {} });
    },
});

function App() {
    return (
        <div>
            <Board />
            <UserConnect />
        </div>
    );
}

export default connect(
    null,
    mapDispatchToProps,
)(App);
