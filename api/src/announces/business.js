export function announceIA() {
    return 'pass';
}

export function shouldStopAnnounces(announces) {
    return announces.length === 4;
}

export function getBestAnnounce(announces) {
    const announcesWoPass = announces.filter(a => a.announce !== 'pass');
    // @TODO: case 4 pass;

    return announcesWoPass[announcesWoPass.length - 1];
}
