import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.view';
import Player from '../player/components/player.view';

import styles from './styles';

export default function Board({
    children, handCards, trick, players = [],
}) {
    global.console.log('trick', trick);

    return (
        <div style={styles.board}>
            <div style={styles.players}>
                <div style={styles.northDiv}>{players[2] ? <Player {...players[2]} /> : null}</div>
                <div style={styles.middleDiv}>
                    {players[1] ? (
                        <div style={styles.westDiv}>
                            <Player {...players[1]} />
                        </div>
                    ) : null}
                    {players[3] ? (
                        <div style={styles.eastDiv}>
                            <Player {...players[3]} />
                        </div>
                    ) : null}
                </div>
                <div style={styles.southDiv}>{players[0] ? <Player {...players[0]} /> : null}</div>
            </div>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            <Hand cardsId={handCards} />
            {children}
        </div>
    );
}

Board.propTypes = {
    children: PropTypes.node,
    handCards: PropTypes.arrayOf(PropTypes.string),
    trick: PropTypes.arrayOf(PropTypes.shape({
        playerId: PropTypes.string,
        cardId: PropTypes.string,
    })).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequided,
    })),
};
