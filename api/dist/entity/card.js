"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getCardColor() {
        return this.id.slice(-1);
    }
    getCardHeight() {
        return this.id.slice(0, this.id.length - 1);
    }
}
exports.Card = Card;
//# sourceMappingURL=card.js.map