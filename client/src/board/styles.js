export default {
    board: {
        backgroundColor: 'green',

        display: 'flex',
        flexDirection: 'column',

        height: '100%',
    },
    mainTitle: {
        alignSelf: 'center',
        position: 'relative',
    },
    players: {
        flex: 1,
        backgroundColor: 'purple',
        display: 'flex',
        flexDirection: 'column',
    },
    northDiv: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    southDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    westDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    eastDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    middleDiv: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItem: 'center',
        justifyContent: 'space-between',
    },
};
