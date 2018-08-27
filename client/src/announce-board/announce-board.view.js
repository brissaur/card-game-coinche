import React from 'react';
import PropTypes from 'prop-types';

const colors = ['H', 'S', 'D', 'C'];
const values = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 27].map(x => x * 10);

function validate(announce) {
    return (
        colors.includes(announce[announce.length - 1]) &&
        values.includes(+announce.slice(0, announce.length - 1))
    );
}

export default class AnnounceBoard extends React.Component {
    constructor() {
        super();
        this.state = { error: null };
        this.onSubmit = this.onSubmit.bind(this);
    }
    // <input initialValue="80H" onSubmit={onAnnounce} />
    onSubmit(event) {
        event.preventDefault();

        if (!validate(this.input.value)) {
            return this.setState({ error: 'Invalid announce' });
        }

        this.setState({ error: null });

        return this.props.onAnnounce(this.input.value, this.props.tableId, this.props.playerId);
    }

    render() {
        const { isMyTurn, isAnnounce } = this.props;
        const error = this.state.error ? `Error: ${this.state.error}` : null;

        const form = (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="announce">
                    Announce:
                    <input
                        defaultValue="80H"
                        type="text"
                        name="name"
                        ref={(input) => {
                            this.input = input;
                        }}
                    />
                </label>
                <input type="submit" value="Submit" />
                <span>{error}</span>
            </form>
        );

        return isMyTurn && isAnnounce ? form : null;
    }
}
AnnounceBoard.propTypes = {
    isMyTurn: PropTypes.bool.isRequired,
    isAnnounce: PropTypes.bool.isRequired,
    onAnnounce: PropTypes.func.isRequired,
};
