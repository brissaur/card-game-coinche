import { filterPlayer } from './helpers';

describe('test filterCardsForPlayerId', () => {
    test('filterPlayer fail', () => {
        const playerId = 5;// player do not exists in the game
        const playersCards = {
            players: [{
                id: 4,
            }],
        };

        // as doc says, function must be wrap for error being caught
        // https://facebook.github.io/jest/docs/en/expect.html#tothrowerror
        function filterPlayerFunc() {
            filterPlayer(playerId, playersCards);
        }

        expect(filterPlayerFunc).toThrowError('Player\'s not found in this table');
    });
});
