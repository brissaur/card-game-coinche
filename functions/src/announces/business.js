export function announceIA() {
    return 'pass';
}

const not = f => (...args) => !f(...args);

function isPass(announce) {
    return announce.announce === 'pass';
}

export function shouldStopAnnounces(announces) {
    return announces.length < 4 ? false : announces.slice(-3).every(isPass);
}

export function getBestAnnounce(announces) {
    const announcesWoPass = announces.filter(not(isPass));

    return announcesWoPass[announcesWoPass.length - 1];
}
