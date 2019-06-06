import { shouldStopAnnounces } from './business';

describe('test announces function', () => {
    test('shouldStopAnnounces', () => {
        [
            {
                announces: [{ announce: '100S' }],
                expected: false,
            },
            {
                announces: [{ announce: 'pass' }, { announce: 'pass' }, { announce: 'pass' }],
                expected: false,
            },
            {
                announces: [{ announce: 'pass' }, { announce: 'pass' }, { announce: 'pass' }, { announce: 'pass' }],
                expected: true,
            },
            {
                announces: [{ announce: '80H' }, { announce: 'pass' }, { announce: 'pass' }, { announce: 'pass' }],
                expected: true,
            },
            {
                announces: [{ announce: 'pass' }, { announce: '80H' }, { announce: 'pass' }, { announce: 'pass' }],
                expected: false,
            },
            {
                announces: [{ announce: 'pass' }, { announce: '80H' }, { announce: 'pass' }, { announce: 'pass' }, { announce: 'pass' }],
                expected: true,
            },
            {
                announces: [
                    { announce: 'pass' },
                    { announce: 'pass' },
                    { announce: '100S' },
                    { announce: 'pass' },
                    { announce: 'pass' },
                    { announce: '130H' },
                ],
                expected: false,
            },
            {
                announces: [
                    { announce: 'pass' },
                    { announce: 'pass' },
                    { announce: '100S' },
                    { announce: 'pass' },
                    { announce: 'pass' },
                    { announce: '130H' },
                    { announce: 'pass' },
                    { announce: 'pass' },
                    { announce: 'pass' },
                ],
                expected: true,
            },
        ].forEach(({ announces, expected }) => expect(shouldStopAnnounces(announces)).toEqual(expected));
    });
});
