describe('test functions', () => {
    test('toto', () => {
        expect(true).toBe(true);
    });
//     let module;
//     let functions;
//     let admin;
//     let event = {};
//
//     beforeEach(() => {
//         jest.mock('firebase-functions');
//         jest.mock('firebase-admin');
//
//         // eslint-disable-next-line prefer-destructuring, global-require
//         functions = require('firebase-functions');
//         admin = require('firebase-admin');
//
//         admin.initializeApp.mockImplementation(() => ({}));
//
//         functions.mockImplementation(() => ({
//             config: () => {
//                 {}
//             },
//             onUpdate: fn => fn,
//         }));
//
//         // eslint-disable-next-line global-require
//         module = require('./index');
//
//         event = {
//             data: {
//                 ref: {
//                     set: jest.fn(),
//                 },
//             },
//         };
//     });
//
//     test.only('dealCards', () => {
//         const players = [];
//         players.push({ id: 1 });
//         // console.log(players);
//         console.log(module);
//         const toto = module.dealCards(players);
//         // console.log(toto);
//     });
//
//     test('test giveHandNextPlayer', () => {
//         const before = {
//             players: [{
//                 id: 1,
//                 pos: 1,
//             }, {
//                 id: 2,
//                 pos: 2,
//             }],
//             trick: [],
//             general: {
//                 currentPlayerId: 1,
//             },
//         };
//
//         const after = {
//             trick: ['AB'],
//             general: {
//                 currentPlayerId: 1,
//             },
//         };
//
//         event = {
//             ...event,
//             data: {
//                 ...event.data,
//                 data: () => after,
//                 previous: {
//                     data: () => before,
//                 },
//             },
//         };
//
//         const expected = {
//             general: {
//                 ...after.general,
//                 currentPlayerId: 2,
//             },
//         };
//
//         module.giveHandNextPlayer(event);
//
//         expect(event.data.ref.set).toHaveBeenCalledWith(expected, {
//             merge: true,
//         });
//     });
});
