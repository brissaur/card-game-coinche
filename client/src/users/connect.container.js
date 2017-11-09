import { connect } from 'react-redux'
import UserConnect from './connect.view'
import * as duck from './duck'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUserConnect: () => dispatch(duck.userConnect())
    }
};

export default connect(
    null,
    mapDispatchToProps
)(UserConnect);