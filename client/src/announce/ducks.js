export const ANNOUNCE_ANNOUNCED = 'announce:announced';

export function announceAnnounced(announce, tableId, playerId) {
    return {
        type: ANNOUNCE_ANNOUNCED,
        meta: { tableId },
        payload: {
            announce,
            playerId
        }
    };
}
