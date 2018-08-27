import { connect } from 'react-redux';
import AnnounceBoardView from './announce-board.view';
import { isMyTurn, isGameModeAnnounce, getTableId, getCurrentPlayerId } from '../table/selectors';
import { announceAnnounced } from '../announce/ducks';

const mapStateToProps = state => ({
    isMyTurn: isMyTurn(state),
    isAnnounce: isGameModeAnnounce(state),
    tableId: getTableId(state),
    playerId: getCurrentPlayerId(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAnnounce(announce, tableId, playerId) {
        console.log('ownProps', ownProps);
        dispatch(announceAnnounced(announce, tableId, playerId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnounceBoardView);
