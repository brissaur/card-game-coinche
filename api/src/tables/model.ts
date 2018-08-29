import {IPlayerId, IPlayer} from '../players/model';
import { IAnnounce } from '../announces/model';

export type ITableId = string;

export interface ITable{
    documentId: ITableId;
    currentPlayerId: IPlayerId;
    firstPlayerId: IPlayerId;
    mode: string;
    players: IPlayer[];
    announces: IAnnounce[];
    currentAnnounce: IAnnounce;
    getDocumentId(): ITableId;
    setDocumentId(documentId: ITableId): void;
    setCurrentAnnounce(announce: IAnnounce): void;
    getCurrentAnnounce(): IAnnounce;
    getPlayers(): IPlayer[];
    setPlayers(players: IPlayer[]): void;
    setCurrentPlayerId(currentPlayerId: IPlayerId): void;
    getCurrentPlayerId(): IPlayerId;
}

export class Table implements ITable{
    documentId: ITableId = null;
    currentPlayerId: IPlayerId = null;
    firstPlayerId: IPlayerId = null;
    mode: string = null;
    players: IPlayer[] = [];
    announces: IAnnounce[] = [];
    currentAnnounce: IAnnounce;
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
    setFirstPlayerId(firstPlayerId: string){
        this.firstPlayerId = firstPlayerId;
    }
    getFirstPlayerId(): string{
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
}

export const createTable = (): Table =>
{
    return new Table();
};