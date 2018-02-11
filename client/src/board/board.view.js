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
                <div style={styles.northDiv}>{players[1] ? <Player {...players[1]} /> : null}</div>
                <div style={styles.middleDiv}>
                    {players[0] ? (
                        <div style={styles.westDiv}>
                            <Player {...players[0]} />
                        </div>
                    ) : null}
                    {players[2] ? (
                        <div style={styles.eastDiv}>
                            <Player {...players[2]} />
                        </div>
                    ) : null}
                </div>
                <div style={styles.southDiv}>{players[3] ? <Player {...players[3]} /> : null}</div>
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
