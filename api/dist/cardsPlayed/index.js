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
const tricks_1 = require("../tricks");
const COLLECTION_NAME = 'cardsPlayed';
exports.getCardsPlayedCollection = (tableId) => {
    const table = tables_1.getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};
const saveCardPlayed = (tableId, cardPlayed) => {
    return exports.getCardsPlayedCollection(tableId).add(cardPlayed);
};
/**
 *
 * @param tableId
 */
exports.getCardsPlayedOnTable = (tableId) => __awaiter(this, void 0, void 0, function* () {
    const cardsPlayed = [];
    const cardsPlayedRef = exports.getCardsPlayedCollection(tableId);
    yield cardsPlayedRef
        .get()
        .then((snapshot) => {
        snapshot.forEach((cardPlayed) => {
            cardsPlayed.push(cardPlayed.data());
        });
    })
        .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents', err);
    });
    return cardsPlayed;
});
const onAddCardPlayed = (message) => __awaiter(this, void 0, void 0, function* () {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    yield saveCardPlayed(tableId, eventData);
    const cardsPlayed = yield exports.getCardsPlayedOnTable(tableId);
    if (cardsPlayed.length >= 4) {
        // add a trick with cardsPlayed
        const tricksCollection = tricks_1.getTricksCollection(tableId);
        yield tricksCollection.add(Object.assign({}, cardsPlayed));
        // empty cardsPlayed
        yield collection_1.emptyCollection(exports.getCardsPlayedCollection(tableId));
    }
    yield tables_1.nextPlayerPlusPlus(tableId, eventData.playerId);
});
// wss.on('', (message: IMessage) => {
//     return onAddCardPlayed(message);
//});
//# sourceMappingURL=index.js.map