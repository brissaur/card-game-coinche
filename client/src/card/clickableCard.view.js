import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from './card.container';
import { cardPlayed } from './ducks';

function ClickableCard({ onCardPlayed, playable, ...card }) {
    return (
        <div onClick={() => (playable ? onCardPlayed(card) : null)}>
            <Card active={playable} {...card} />
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onCardPlayed(card) {
            dispatch(cardPlayed(card));
        },
    };
}

export default connect(null, mapDispatchToProps)(ClickableCard);

ClickableCard.propTypes = {
    onCardPlayed: PropTypes.func.isRequired,
    playable: PropTypes.bool.isRequired,
};
