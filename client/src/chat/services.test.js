import { computeDisplayTime } from './services';

test('computeDisplayTime', () => {
    expect(computeDisplayTime('Hi dude')).toBe(3000);
    expect(computeDisplayTime('Hi dude this is more long than 3000 to read')).toBe(4000);
});
