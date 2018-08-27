import {ICardId} from "../cardsPlayed/model";

export type IPlayerId = string;

export interface IPlayer{
    id: IPlayerId;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: ICardId[];
    setId(id: IPlayerId): void;
    getId(): IPlayerId;
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
    id: IPlayerId = null;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: ICardId[];
    constructor(firstname: string, isFakePlayer: boolean){
        this.firstname = firstname;
        this.isFakePlayer = isFakePlayer;
    }
    setId(id: IPlayerId){
        this.id = id;
    }
    getId(): IPlayerId{
        return this.id;
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
    let player = new Player('Robot '+pos, true);
    player.setPos(pos);
    return player;
};

export const createPlayer = (): Player => {
    let player = new Player('Michelle', false);
    player.setPos(0);

    return player;
};