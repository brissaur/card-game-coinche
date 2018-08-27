import {IPlayerId, IPlayer} from '../players/model';
import { IAnnounce } from '../announces/model';

export const modeAnnounce = 'announce';
export const modePlay = 'play';

export type ITableId = string;

export interface ITable{
    id: ITableId;
    currentPlayerId: IPlayerId;
    firstPlayerId: IPlayerId;
    mode: string;
    players: IPlayer[];
    announces: IAnnounce[];
}

export class Table implements ITable{
    id: ITableId = null;
    currentPlayerId: IPlayerId = null;
    firstPlayerId: IPlayerId = null;
    mode: string = null;
    players: IPlayer[] = [];
    announces: IAnnounce[] = [];
    setId(id: ITableId){
        this.id = id;
    }
    getId(): ITableId{
        return this.id;
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