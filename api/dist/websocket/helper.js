"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMsgForWs = function (type, payload, meta) {
    if (typeof payload !== 'object') {
        throw new Error('Cannot format object of non-object type');
    }
    return JSON.stringify({ type, meta, payload });
};
exports.decodeMsgFromWs = function (message) {
    let decoded = null;
    try {
        decoded = JSON.parse(message);
    }
    catch (e) {
        global.console.error('This doesn\'t look like a valid JSON: ', message, e);
        throw e;
    }
    if (!decoded.type) {
        const errorMessage = 'message ' + decoded + ' doesn\'t have a valid type';
        global.console.error(errorMessage);
        throw new Error(errorMessage);
    }
    const { type, meta, payload } = decoded;
    return { type, meta, payload };
};
//# sourceMappingURL=helper.js.map