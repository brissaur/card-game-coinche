import {IPlayerId} from "../players/model";

export type ICardId = string;

export interface ICard{
    documentId: ICardId;// object id in db
    cardId: ICardId; //id of card (ex: 10J)
    setDocumentId(documentId: ICardId): void;
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
    setDocumentId(documentId: ICardId): void{
        this.documentId = documentId;
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

type ICardPlayedId = string;

export interface ICardPlayed{
    documentId: ICardPlayedId;
    cardId: ICardId;
    playerId: IPlayerId;
    setDocumentId(documentId: ICardPlayedId): void;
    getDocumentId(): ICardPlayedId;
    setCardId(cardId: ICardId): void;
    getCardId(): ICardId;
    setPlayerId(playerId: IPlayerId): void;
    getPlayerId(): IPlayerId;
}

export class CardPlayed implements ICardPlayed{
    documentId: ICardPlayedId;
    cardId: ICardId;
    playerId: IPlayerId;
    setDocumentId(documentId: ICardPlayedId){
        this.documentId = documentId;
    }
    getDocumentId(): ICardPlayedId{
        return this.documentId;
    }
    setPlayerId(playerId: IPlayerId): void{
        this.playerId = playerId;
    }
    getPlayerId(): IPlayerId{
        return this.playerId;
    }
    setCardId(cardId: ICardId): void
    {
        this.cardId = cardId;
    }
    getCardId(): ICardId
    {
        return this.cardId;
    }
}