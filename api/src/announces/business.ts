import { IAnnounce } from "./types";

export function announceIA() {
    return 'pass';
}

export function shouldStopAnnounces(announces) {
    return announces.length === 4;
}

export function getBestAnnounce(announces: IAnnounce[]) {
    const announcesWoPass = announces.filter((a: any) => a.announce !== 'pass');
    // @TODO: case 4 pass;

    return announcesWoPass[announcesWoPass.length - 1];
}
