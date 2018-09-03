import {ICardId, ICardPlayed} from "../cardsPlayed/model";

export type ITrickId = string;

export interface ITrick{
    documentId: ITrickId;
    cardsPlayed: ICardPlayed[];
    setDocumentId(documentId: ITrickId): void;
    getDocumentId(): ITrickId;
    set(cardsPlayed: ICardPlayed[]): void;
    get(): ICardPlayed[];
}

export class Trick implements ITrick {
    documentId: ITrickId;
    cardsPlayed: ICardPlayed[];
    setDocumentId(documentId: ITrickId){
        this.documentId = documentId;
    }
    getDocumentId(): ITrickId
    {
        return this.documentId;
    }
    set(cardsPlayed: ICardPlayed[]) {
        this.cardsPlayed = cardsPlayed;
    }

    get(): ICardPlayed[] {
        return this.cardsPlayed;
    }
}