import { selectWinnerOfTrick } from './business';

describe.only('test cardsPlayed function', () => {
    [
        // {
        //     cardsPlayed: [
        //         {
        //             cardId: 'AH',
        //             playerId: 1
        //         },
        //         {
        //             cardId: '7S',
        //             playerId: 2
        //         },
        //         {
        //             cardId: 'JD',
        //             playerId: 3
        //         },
        //         {
        //             cardId: '10C',
        //             playerId: 4
        //         },
        //     ],
        //     trump: 'H',
        //     expectedPlayer: 1
        // },
        {
            cardsPlayed: [
                {
                    cardId: 'AH',
                    playerId: 1,
                },
                {
                    cardId: '8H',
                    playerId: 2,
                },
                {
                    cardId: 'KH',
                    playerId: 3,
                },
                {
                    cardId: 'JH',
                    playerId: 4,
                },
            ],
            trump: 'H',
            expectedPlayer: 4,
        },
    ].forEach((data) => {
        test('selectWinnerOfTrick', () => {
            expect(selectWinnerOfTrick(data.cardsPlayed, data.trump)).toEqual(data.expectedPlayer);
        });
    });
});
