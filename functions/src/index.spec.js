describe('test functions', () => {
    let module;
    let firestore;
    let event = {};

    beforeEach(() => {
        jest.mock('firebase-functions');

        // eslint-disable-next-line prefer-destructuring, global-require
        firestore = require('firebase-functions').firestore;
        // eslint-disable-next-line global-require
        module = require('./index');

        firestore.document.mockImplementation(() => ({
            onCreate: fn => fn,
            onUpdate: fn => fn,
        }));

        event = {
            data: {
                ref: {
                    set: jest.fn(),
                },
            },
        };
    });

    test('test giveHandNextPlayer', () => {
        const before = {
            players: [{
                id: 1,
                pos: 1,
            }, {
                id: 2,
                pos: 2,
            }],
            trick: [],
            general: {
                currentPlayerId: 1,
            },
        };

        const after = {
            trick: ['AB'],
            general: {
                currentPlayerId: 1,
            },
        };

        event = {
            ...event,
            data: {
                ...event.data,
                data: () => after,
                previous: {
                    data: () => before,
                },
            },
        };

        const expected = {
            general: {
                ...after.general,
                currentPlayerId: 2,
            },
        };

        module.giveHandNextPlayer(event);

        expect(event.data.ref.set).toHaveBeenCalledWith(expected, {
            merge: true,
        });
    });
});
