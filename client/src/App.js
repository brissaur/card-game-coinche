import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';

import { getAppLoadedStatus } from './bootstrap/selectors';
import { getPlayerName, getPlayerId } from './player/selectors';
import { getTableId } from './table/selectors';

function mapStateToProps(state) {
    const { isLoaded, error } = getAppLoadedStatus(state);

    return {
        isLoaded,
        error,
        playerName: getPlayerName(state),
        id: getPlayerId(state),
        tableId: getTableId(state),
    };
}
const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch({ type: 'TEST_ACTION', payload: {} });
    },
});

function App({
    isLoaded, error, playerName, id, tableId,
}) {
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            <div>
                Hello {playerName} with id {id} and tableId {tableId}
            </div>
            <Board />
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
