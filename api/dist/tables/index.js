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
const players_1 = require("../players");
const announces_1 = require("../announces");
const db_1 = require("../db");
exports.COLLECTION_NAME = 'tables';
exports.getTableById = (tableId) => {
    return db_1.firestore
        .collection(exports.COLLECTION_NAME)
        .doc(tableId);
};
const updateTable = (tableId, table) => __awaiter(this, void 0, void 0, function* () {
    return exports.getTableById(tableId).update(table);
});
function nextPlayerPlusPlus(tableId, previousPlayerId) {
    return __awaiter(this, void 0, void 0, function* () {
        // const players = await getPlayersOnTable(tableId);
        // const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
        // const tableRef = getTableById(tableId);
        // tableRef.update(
        //     {
        //         currentPlayerId: nextPlayer.id
        //     },
        // );
    });
}
exports.nextPlayerPlusPlus = nextPlayerPlusPlus;
const onUpdateTable = (message) => __awaiter(this, void 0, void 0, function* () {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    yield updateTable(tableId, eventData);
    const currentPlayerId = eventData.currentPlayerId;
    const players = yield players_1.getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);
    if (currentPlayer.isFakePlayer) {
        if (eventData.mode === 'play') {
            // const cardsPlayedRef = getCardsPlayedCollection(tableId);
            // const cardsPlayed = await getCardsPlayedOnTable(tableId);
            // const trump = eventData.currentAnnounce.announce.slice(-1);
            // const cards = possibleCards(
            //     trump,
            //     { ...currentPlayer, cards: currentPlayer.cards },
            //     cardsPlayed.map(({ cardId }) => new Card(cardId)),
            // );
            //
            // const nextCardPlayed = cards[0].id;
            //
            // await cardsPlayedRef.add({
            //     playerId: currentPlayerId,
            //     cardId: nextCardPlayed,
            // });
            //
            // const playersRef = getPlayersCollection(tableId);
            // await playersRef.doc(currentPlayerId).update({
            //     cards: currentPlayer.cards.filter((c: string) => c !== nextCardPlayed)
            // });
        }
        else {
            yield announces_1.performAnnounce(tableId, currentPlayerId);
        }
    }
});
//# sourceMappingURL=index.js.map