import { connect } from 'react-redux';
import Hand from './hand.view';
import { getPlayerCards, isActivePlayer, getGameMode, getPlayableCards } from '../table/selectors';

const mapStateToProps = state => ({
    playableCards: getPlayableCards(state),
    cardsId: getPlayerCards(state),
    isActive: isActivePlayer(state),
    mode: getGameMode(state),
});

export default connect(mapStateToProps)(Hand);
