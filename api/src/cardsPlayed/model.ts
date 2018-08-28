export type ICardId = string;

export interface ICard{
    documentId: ICardId;// object id in db
    cardId: ICardId; //id of card (ex: 10J)
    getDocumentId(): ICardId;
    getCardId(): ICardId;
    getCardColor(): string;
    getCardHeight(): string;
}

export class Card implements ICard{
    documentId: ICardId;
    cardId: ICardId;
    color: string;
    height: string;
    constructor(cardId: ICardId) {
        this.cardId = cardId;
    }
    getDocumentId(): ICardId{
        return this.documentId;
    }
    getCardId(): ICardId{
        return this.documentId;
    }
    getCardColor(): string{
        return this.cardId.slice(-1);
    }
    getCardHeight(): string{
        return this.cardId.slice(0, this.cardId.length - 1);
    }
}