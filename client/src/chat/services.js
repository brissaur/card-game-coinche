export function computeDisplayTime(message) {
    const nbWords = message.split(' ').length;

    return Math.max(3000, nbWords * 400);
}
