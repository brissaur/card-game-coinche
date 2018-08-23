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
const tableHydrator_1 = require("../hydrator/tableHydrator");
const TABLE_COLLECTION = 'tables';
class TableRepository extends AbstractRepository_1.AbstractRepository {
    constructor() {
        super();
        this.collection = this.connection.collection(TABLE_COLLECTION);
    }
    getCollection() {
        return this.collection;
    }
    saveTable(table) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.collection.add(tableHydrator_1.extract(table));
            table = tableHydrator_1.hydrate(yield doc.get(), table);
            return table;
        });
    }
}
exports.repository = new TableRepository();
//# sourceMappingURL=TableRepository.js.map