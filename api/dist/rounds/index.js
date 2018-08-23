"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tables_1 = require("../tables");
const COLLECTION_NAME = 'rounds';
/**
 *
 * @param tableId
 * @returns CollectionReference
 */
exports.getRoundsCollection = (tableId) => {
    const table = tables_1.getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};
//# sourceMappingURL=index.js.map