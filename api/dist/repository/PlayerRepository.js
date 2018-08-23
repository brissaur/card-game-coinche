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
const AbstractRepository_1 = require("./AbstractRepository");
const playerHydrator_1 = require("../hydrator/playerHydrator");
const PLAYER_COLLECTION = 'players';
class PlayerRepository extends AbstractRepository_1.AbstractRepository {
    constructor() {
        super();
        this.collection = this.connection.collection(PLAYER_COLLECTION);
    }
    getCollection() {
        return this.collection;
    }
    savePlayer(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.collection.add(playerHydrator_1.extract(player));
            player = playerHydrator_1.hydrate(yield doc.get(), player);
            return player;
        });
    }
}
exports.repository = new PlayerRepository();
//# sourceMappingURL=PlayerRepository.js.map