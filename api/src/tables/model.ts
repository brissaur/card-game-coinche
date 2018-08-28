import {IPlayerId, IPlayer} from '../players/model';
import { IAnnounce } from '../announces/model';

export const modeAnnounce = 'announce';
export const modePlay = 'play';

export type ITableId = string;

export interface ITable{
    documentId: ITableId;
    currentPlayerId: IPlayerId;
    firstPlayerId: IPlayerId;
    mode: string;
    players: IPlayer[];
    announces: IAnnounce[];
    getDocumentId(): ITableId;
    setDocumentId(documentId: ITableId): void;
}

export class Table implements ITable{
    documentId: ITableId = null;
    currentPlayerId: IPlayerId = null;
    firstPlayerId: IPlayerId = null;
    mode: string = null;
    players: IPlayer[] = [];
    announces: IAnnounce[] = [];
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
}

export const createTable = (): Table =>
{
    return new Table();
};