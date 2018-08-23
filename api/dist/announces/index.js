"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../common/collection");
const tables_1 = require("../tables");
const business_1 = require("./business");
const websocket_1 = require("../websocket");
const COLLECTION_NAME = 'announces';
exports.getAnnouncesCollection = (tableId) => {
    const table = tables_1.getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};
function createAnnouncesFromSnapshot(snapshot) {
    const announces = [];
    snapshot.forEach(doc => announces.push(doc.data()));
    return announces;
}
const saveAnnounce = (tableId, announce) => {
    return exports.getAnnouncesCollection(tableId).add(announce);
};
function getAnnounces(tableId) {
    return __awaiter(this, void 0, void 0, function* () {
        const announces = yield exports.getAnnouncesCollection(tableId)
            .get()
            .then(createAnnouncesFromSnapshot);
        return announces;
    });
}
exports.getAnnounces = getAnnounces;
function performAnnounce(tableId, playerId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.getAnnouncesCollection(tableId).add({
            playerId,
            announce: business_1.announceIA(),
        });
    });
}
exports.performAnnounce = performAnnounce;
const onAnnounce = (message) => __awaiter(this, void 0, void 0, function* () {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    const playerId = eventData.playerId;
    // save announce in DB
    yield saveAnnounce(tableId, eventData);
    // get back announces from DB
    const announces = yield getAnnounces(tableId);
    if (business_1.shouldStopAnnounces(announces)) {
        const fbTable = tables_1.getTableById(tableId);
        const firstPlayerId = yield fbTable.get().then(doc => doc.data().firstPlayerId);
        yield collection_1.emptyCollection(exports.getAnnouncesCollection(tableId));
        yield fbTable.update({
            currentPlayerId: firstPlayerId,
            currentAnnounce: business_1.getBestAnnounce(announces),
            mode: 'play',
        });
    }
    else {
        yield tables_1.nextPlayerPlusPlus(tableId, playerId);
    }
});
websocket_1.connection.on(websocket_1.ANNOUNCE_SERVER_WS, (message) => {
    console.log('onAnnounce');
    return onAnnounce(message);
});
//# sourceMappingURL=index.js.map