import React from 'react';
import PropTypes from 'prop-types';

export default function Announce({ announce }) {
    return <span>announced: {announce}</span>;
}

Announce.propTypes = {
    announce: PropTypes.string.isRequired,
};
