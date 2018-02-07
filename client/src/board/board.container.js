import { connect } from 'react-redux';
import BoardView from './board.view';
import { getPlayerCards, getTrick, getPlayers } from '../table/selectors';

const mapStateToProps = state => ({
    handCards: getPlayerCards(state),
    trick: getTrick(state),
    players: getPlayers(state),
});

export default connect(mapStateToProps)(BoardView);
