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
const rounds_1 = require("../rounds");
const players_1 = require("../players");
const business_1 = require("../players/business");
const COLLECTION_NAME = 'tricks';
/**
 *
 * @param tableId
 */
exports.getTricksCollection = (tableId) => {
    const table = tables_1.getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};
const saveTrick = (tableId, trick) => __awaiter(this, void 0, void 0, function* () {
    return exports.getTricksCollection(tableId).add(trick);
});
/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
const getTricksOnTable = (tableId) => __awaiter(this, void 0, void 0, function* () {
    const tricks = [];
    const tricksRef = exports.getTricksCollection(tableId);
    yield tricksRef
        .get()
        .then((snapshot) => {
        snapshot.forEach((trick) => {
            tricks.push(trick.data());
        });
    })
        .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents', err);
    });
    return tricks;
});
const addTrick = (message) => __awaiter(this, void 0, void 0, function* () {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    yield saveTrick(tableId, eventData);
    const tricks = yield getTricksOnTable(tableId);
    if (tricks.length === 8) {
        // add new round
        const roundsRef = rounds_1.getRoundsCollection(tableId);
        yield roundsRef.add(Object.assign({}, tricks));
        // => remove tricks
        yield collection_1.emptyCollection(exports.getTricksCollection(tableId));
        // => next round
        // deal cards
        const players = yield players_1.getPlayersOnTable(tableId);
        const playersWithCards = business_1.dealCards(players);
        const playersRef = players_1.getPlayersCollection(tableId);
        yield playersWithCards.forEach((player) => __awaiter(this, void 0, void 0, function* () {
            playersRef.doc(player.id).update({ cards: player.cards });
        }));
        // update next player, dealer, mode
        const fbTableRef = tables_1.getTableById(tableId);
        const nextDealer = yield fbTableRef.get()
            .then((snapshot) => snapshot.data().firstPlayerId);
        const nextPlayer = yield tables_1.nextPlayerPlusPlus(tableId, nextDealer);
        yield fbTableRef.update({
            mode: 'announce',
            firstPlayerId: nextPlayer,
            currentPlayerId: nextPlayer
        });
    }
});
//# sourceMappingURL=index.js.map