import React, { Component } from 'react'
import PropTypes from 'prop-types';

import styles from './styles.js'

export default function Board({ children }) {
    return (
        <div style={styles.board}>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            { children }
        </div>
    )
}

Board.propTypes = {
    children: PropTypes.node,
}