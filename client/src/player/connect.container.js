import { connect } from 'react-redux';
import PlayerConnect from './connect.view';
import * as duck from './duck';

const mapDispatchToProps = dispatch => ({
    onChangeValue: (evt) => {
        dispatch(duck.setUserName(evt.target.value));
    },
    onUserConnect: () => dispatch({ type: duck.PLAYER_CONNECT_ACTION }),
});

export default connect(
    null,
    mapDispatchToProps,
)(PlayerConnect);
