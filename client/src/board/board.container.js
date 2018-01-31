import { connect } from 'react-redux';
import BoardView from './board.view';
import { getPlayerCards, getTrick } from '../table/selectors';

const mapStateToProps = state => ({
    handCards: getPlayerCards(state),
    trick: getTrick(state),
});

export default connect(mapStateToProps)(BoardView);
