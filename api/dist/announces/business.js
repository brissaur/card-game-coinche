"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function announceIA() {
    return 'pass';
}
exports.announceIA = announceIA;
function shouldStopAnnounces(announces) {
    return announces.length === 4;
}
exports.shouldStopAnnounces = shouldStopAnnounces;
function getBestAnnounce(announces) {
    const announcesWoPass = announces.filter((a) => a.announce !== 'pass');
    // @TODO: case 4 pass;
    return announcesWoPass[announcesWoPass.length - 1];
}
exports.getBestAnnounce = getBestAnnounce;
//# sourceMappingURL=business.js.map