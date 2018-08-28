import {ICardId} from "../cardsPlayed/model";

export type ITrickId = string;

export interface ITrick{
    documentId: ITrickId;
    cardId: string;
    playerId: string;
    setDocumentId(documentId: ITrickId): void;
    getDocumentId(): ITrickId;
    setCardId(id: ICardId): void;
    getCardId(): ICardId;
    setPlayerId(id: ICardId): void;
    getPlayerId(): ICardId;
}

export class Trick implements ITrick{
    documentId: ITrickId;
    cardId: string;
    playerId: string;
    getDocumentId(): ITrickId{
        return this.documentId;
    }
    setDocumentId(documentId: ITrickId){
        this.documentId = documentId;
    }
    setCardId(id: ICardId){
        this.cardId = id;
    }
    getCardId(): ICardId{
        return this.cardId;
    }
    setPlayerId(id: ICardId){
        this.playerId = id;
    }
    getPlayerId(): ICardId{
        return this.playerId;
    }
}