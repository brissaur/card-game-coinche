"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
class AbstractRepository {
    constructor() {
        this.connection = db_1.firestore;
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=AbstractRepository.js.map