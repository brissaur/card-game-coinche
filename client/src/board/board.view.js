import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.view';
import Player from '../player/components/player.view';
import AnnounceBoard from '../announce-board/announce-board.container';

import styles from './styles';

export default function Board({
    children, handCards, players = [], mode,
}) {
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
                    {mode === 'announce' ? <AnnounceBoard /> : null}
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
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequided,
    })),
    mode: PropTypes.oneOf(['announce', 'play']).isRequired,
};
