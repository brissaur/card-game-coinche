export const ANNOUNCE_ANNOUNCED = 'announce:announced';

export function announceAnnounced(announce) {
    return {
        type: ANNOUNCE_ANNOUNCED,
        announce,
    };
}
