import { connect } from 'react-redux';
import BoardView from './board.view';
import { getPlayerCards } from '../table/selectors';

const mapStateToProps = state => ({
    handCards: getPlayerCards(state),
});

export default connect(mapStateToProps)(BoardView);
