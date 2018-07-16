import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {REMOVE_CARD_ID_IN_HAND} from "./ducks";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test reducer', () => {
    [
        {
            table: {
                players: [
                    {
                        cards: ['8D','JD','10D','9H'],
                        id: 'player1'
                    },
                    {
                        cards: ['AS','7C','AD','10H'],
                        id: 'player2'
                    },
                    {
                        cards: ['9D','AH','AC','QC'],
                        id: 'player3'
                    },
                    {
                        cards: ['9S','KC','QD','QH'],
                        id: 'player4'
                    }
                ]
            },
        },
        {
            type: 'REMOVE_CARD_ID_IN_HAND',
            id: '7C',
            playerId: 'player2'
        },
        {
            table: {
                players: [
                    {
                        cards: ['8D','JD','10D','9H'],
                        id: 'player1'
                    },
                    {
                        cards: ['AS','AD','10H'],
                        id: 'player2'
                    },
                    {
                        cards: ['9D','AH','AC','QC'],
                        id: 'player3'
                    },
                    {
                        cards: ['9S','KC','QD','QH'],
                        id: 'player4'
                    }
                ]
            },
        },
    ].forEach((storeData, actionData, expectedStoreData) => {
        test('with REMOVE_CARD_ID_IN_HAND dispatch', () => {
            const store = mockStore(storeData);
​
            expect(store.dispatch(actionData))
        });
    });
});
