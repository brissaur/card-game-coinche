import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

function KeyboardUI({ active, onChange, value }) {
    /* eslint-disable jsx-a11y/no-autofocus */
    return active ? (
        <div style={styles.keyboard}>
            <input type="text" style={styles.input} autoFocus onChange={onChange} value={value} />
        </div>
    ) : null;
}

KeyboardUI.propTypes = {
    active: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,

    value: PropTypes.string.isRequired,
};

export default KeyboardUI;
