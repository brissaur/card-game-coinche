export interface ICard {
    id: string;
    color: string;
    height: string;
}

export interface IPlayer{
    id: string;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: ICard[];
}