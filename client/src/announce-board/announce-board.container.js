import { connect } from 'react-redux';
import AnnounceBoardView from './announce-board.view';
import { isMyTurn, isGameModeAnnounce } from '../table/selectors';
import { announceAnnounced } from '../announce/ducks';

const mapStateToProps = state => ({
    isMyTurn: isMyTurn(state),
    isAnnounce: isGameModeAnnounce(state),
});

const mapDispatchToProps = (dispatch) => ({
    onAnnounce(announce) {
        dispatch(announceAnnounced(announce));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnounceBoardView);
