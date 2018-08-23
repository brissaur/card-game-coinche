export class Card {
    id: string;
    color: string;
    height: string;
    constructor(id: string) {
        this.id = id;
    }
    getId(): string{
        return this.id;
    }
    getCardColor(): string{
        return this.id.slice(-1);
    }
    getCardHeight(): string{
        return this.id.slice(0, this.id.length - 1);
    }
}