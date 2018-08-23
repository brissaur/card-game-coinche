import { Card } from "../entity/card";

export class Player{
    id: string;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: Card[];
    constructor(firstname: string, isFakePlayer: boolean){
        this.firstname = firstname;
        this.isFakePlayer = isFakePlayer;
    }
    setId(id: string){
        this.id = id;
    }
    getId(): string{
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
    setCards(cards: Card[]){
        this.cards = cards;
    }
    getCards(): Card[]{
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