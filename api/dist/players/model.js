"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(firstname, isFakePlayer) {
        this.firstname = firstname;
        this.isFakePlayer = isFakePlayer;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setFirstname(firstname) {
        this.firstname = firstname;
    }
    getFirstname() {
        return this.firstname;
    }
    setIsFakePlayer(isFakePlayer) {
        this.isFakePlayer = isFakePlayer;
    }
    getIsFakePlayer() {
        return this.isFakePlayer;
    }
    setPos(pos) {
        this.pos = pos;
    }
    getPos() {
        return this.pos;
    }
    setCards(cards) {
        this.cards = cards;
    }
    getCards() {
        return this.cards;
    }
}
exports.Player = Player;
exports.createFakePlayer = (pos) => {
    let player = new Player('Robot ' + pos, true);
    player.setPos(pos);
    return player;
};
exports.createPlayer = () => {
    let player = new Player('Michelle', false);
    player.setPos(0);
    return player;
};
//# sourceMappingURL=model.js.map