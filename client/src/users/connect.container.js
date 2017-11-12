import { connect } from 'react-redux';
import UserConnect from './connect.view';
import * as duck from './duck';

let timer = null;

const mapDispatchToProps = dispatch => ({
    onChangeValue: (evt) => {
        clearTimeout(timer);
        const { value } = evt.target;
        timer = setTimeout(() => {
            dispatch(duck.setUserName(value));
        }, 1000);
    },
    onUserConnect: () => dispatch({ type: duck.USER_CONNECT_ACTION }),
});

export default connect(
    null,
    mapDispatchToProps,
)(UserConnect);
