export type ICardId = string;

export interface ICard{
    id: ICardId;// object id in db
    cardId: ICardId; //id of card (ex: 10J)
    getCardId(): ICardId;
    getCardColor(): string;
    getCardHeight(): string;
}

export class Card implements ICard{
    id: ICardId;
    cardId: ICardId;
    color: string;
    height: string;
    constructor(cardId: ICardId) {
        this.cardId = cardId;
    }
    getId(): ICardId{
        return this.id;
    }
    getCardId(): ICardId{
        return this.id;
    }
    getCardColor(): string{
        return this.id.slice(-1);
    }
    getCardHeight(): string{
        return this.id.slice(0, this.id.length - 1);
    }
}