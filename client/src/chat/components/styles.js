export default {
    keyboard: {
        position: 'fixed',
        bottom: '15px',
        // height: '50px',
        width: '95%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'red',
        display: 'flex',
    },
    chatArea: {
        position: 'fixed',
        bottom: '175px',
        // height: '50px',
        width: '50%',
        left: '15px',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        padding: '15px',
    },
    input: {
        flex: '1',
    },
    chatMessage: {
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0s 2s, opacity 2s linear',
    },
};

// position: fixed;
// bottom: 20px;
// height: 100px;
// width: 95%;
// background-color: red;
// left: 50%;
// transform: translateX(-50%);
