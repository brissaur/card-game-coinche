import {ICardId} from "../cardsPlayed/model";

export type ITrickId = string;

export interface ITrick{
    id: ITrickId;
    cardId: string;
    playerId: string;
    setCardId(id: ICardId): void;
    getCardId(): ICardId;
    setPlayerId(id: ICardId): void;
    getPlayerId(): ICardId;
}

export class Trick implements ITrick{
    id: ITrickId;
    cardId: string;
    playerId: string;
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