import {IPlayerId, IPlayer } from '../players/model';
import {IAnnounce} from '../announces/model';
import {ITrick} from "../tricks/model";
import {ICard, ICardPlayed} from "../cardsPlayed/model";
import {IRound} from "../rounds/model";

export type ITableId = string;

export interface ITable{
    documentId: ITableId;
    currentPlayerId: IPlayerId;
    firstPlayerId: IPlayerId;
    currentAnnounce: IAnnounce;
    mode: string;
    players: IPlayer[];
    announces: IAnnounce[];
    tricks: ITrick[];
    cardsPlayed: ICardPlayed[];
    rounds: IRound[];
    getDocumentId(): ITableId;
    setDocumentId(documentId: ITableId): void;
    setMode(mode: string): void;
    getMode(): string;
    setCurrentAnnounce(announce: IAnnounce): void;
    getCurrentAnnounce(): IAnnounce;
    getPlayers(): IPlayer[];
    setPlayers(players: IPlayer[]): void;
    setCurrentPlayerId(currentPlayerId: IPlayerId): void;
    getCurrentPlayerId(): IPlayerId;
    setFirstPlayerId(firstPlayerId: IPlayerId): void;
    getFirstPlayerId(): IPlayerId;
    setAnnounces(announces: IAnnounce[]): void;
    getAnnounces(): IAnnounce[];
    setTricks(tricks: ITrick[]): void;
    getTricks(): ITrick[];
    setCardsPlayed(cardsPlayed: ICardPlayed[]): void;
    getCardsPlayed(): ICardPlayed[];
    setRounds(rounds: IRound[]): void;
    getRounds(): IRound[];
}

export class Table implements ITable{
    documentId: ITableId = null;
    currentPlayerId: IPlayerId = null;
    firstPlayerId: IPlayerId = null;
    currentAnnounce: IAnnounce;
    mode: string = null;
    players: IPlayer[] = [];
    announces: IAnnounce[] = [];
    tricks: ITrick[] = [];
    cardsPlayed: ICardPlayed[] = [];
    rounds: IRound[] = [];
    setDocumentId(id: ITableId){
        this.documentId = id;
    }
    getDocumentId(): ITableId{
        return this.documentId;
    }
    setCurrentPlayerId(currentPlayerId: string){
        this.currentPlayerId = currentPlayerId;
    }
    getCurrentPlayerId(): string{
        return this.currentPlayerId;
    }
    setFirstPlayerId(firstPlayerId: IPlayerId): void{
        this.firstPlayerId = firstPlayerId;
    }
    getFirstPlayerId(): IPlayerId{
        return this.firstPlayerId;
    }
    setMode(mode: string){
        this.mode = mode;
    }
    getMode(): string{
        return this.mode;
    }
    setPlayers(players: IPlayer[]){
        this.players = players;
    }
    getPlayers(): IPlayer[]{
        return this.players;
    }
    setAnnounces(announces: IAnnounce[]){
        this.announces = announces;
    }
    getAnnounces(): IAnnounce[]{
        return this.announces;
    }
    setCurrentAnnounce(announce: IAnnounce){
        this.currentAnnounce = announce;
    }
    getCurrentAnnounce(): IAnnounce{
        return this.currentAnnounce;
    }
    setTricks(tricks: ITrick[]): void{
        this.tricks = tricks;
    }
    getTricks(): ITrick[]{
        return this.tricks;
    }
    setCardsPlayed(cardsPlayed: ICardPlayed[]): void
    {
        this.cardsPlayed = cardsPlayed;
    }
    getCardsPlayed(): ICardPlayed[]
    {
        return this.cardsPlayed;
    }
    getRounds(): IRound[]
    {
        return this.rounds;
    }
    setRounds(rounds: IRound[])
    {
        this.rounds = rounds;
    }
}

export const createTable = (): Table =>
{
    return new Table();
};