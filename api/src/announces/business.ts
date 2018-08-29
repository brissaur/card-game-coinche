import { IAnnounce } from "./model";

export const modes = {
    PLAY: 'play',
    ANNOUNCE: 'announce'
};

export function announceIA() {
    return 'pass';
}

export function shouldStopAnnounces(announces: IAnnounce[]) {
    return announces.length === 4;
}

export function getBestAnnounce(announces: IAnnounce[]): IAnnounce {
    const announcesWoPass = announces.filter((a: IAnnounce) => a.getAnnounce() !== 'pass');
    // @TODO: case 4 pass;

    return announcesWoPass[announcesWoPass.length - 1];
}
