import {ICardId} from "../cardsPlayed/model";

export type IPlayerId = string;

export interface IPlayer{
    documentId: IPlayerId;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: ICardId[];
    setDocumentId(documentId: IPlayerId): void;
    getDocumentId(): IPlayerId;
    setCards(cards: ICardId[]): void;
    getCards(): ICardId[];
    setFirstname(firstname: string): void;
    getFirstname(): string;
    setIsFakePlayer(isFakePlayer: boolean): void;
    getIsFakePlayer(): boolean;
    setPos(pos: number): void;
    getPos(): number;
}

export class Player implements IPlayer{
    documentId: IPlayerId = null;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: ICardId[];
    setDocumentId(documemtId: IPlayerId){
        this.documentId = documemtId;
    }
    getDocumentId(): IPlayerId{
        return this.documentId;
    }
    setFirstname(firstname: string){
        this.firstname = firstname;
    }
    getFirstname():string{
        return this.firstname;
    }
    setIsFakePlayer(isFakePlayer: boolean){
        this.isFakePlayer = isFakePlayer;
    }
    getIsFakePlayer(): boolean{
        return this.isFakePlayer;
    }
    setPos(pos: number){
        this.pos = pos;
    }
    getPos(): number{
        return this.pos;
    }
    setCards(cards: ICardId[]){
        this.cards = cards;
    }
    getCards(): ICardId[]{
        return this.cards;
    }
}

export const createFakePlayer = (pos: number): Player => {
    let player = new Player();
    player.setFirstname('Robot');
    player.setIsFakePlayer(true);
    player.setPos(pos);
    return player;
};

export const createPlayer = (): Player => {
    let player = new Player();
    player.setFirstname('Michelle');
    player.setIsFakePlayer(false);
    player.setPos(0);

    return player;
};