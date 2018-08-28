import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.container';
import Player from '../player/components/player.view';
import AnnounceBoard from '../announce-board/announce-board.container';

import styles from './styles';
import Keyboard from '../chat/components/keyboard.view';
import ChatArea from '../chat/components/chat-area';

export default function Board({ children, trick, players = [] }) {
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
                    <AnnounceBoard />
                    {players[3] ? (
                        <div style={styles.eastDiv}>
                            <Player {...players[3]} />
                        </div>
                    ) : null}
                </div>
                <div style={styles.southDiv}>{players[0] ? <Player {...players[0]} /> : null}</div>
            </div>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            <Hand />
            {children}
            <ChatArea />
            <Keyboard />
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
