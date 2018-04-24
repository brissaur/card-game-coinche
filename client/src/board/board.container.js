import { connect } from 'react-redux';
import BoardView from './board.view';
import { getTrick, getPlayers } from '../table/selectors';

const mapStateToProps = state => ({
    trick: getTrick(state),
    players: getPlayers(state),
});

export default connect(mapStateToProps)(BoardView);
