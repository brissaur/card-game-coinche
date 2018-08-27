import { IPlayerId } from '../players/model';

//export const ANNOUNCE_PASS = 'pass';

export type IAnnounceId = string;

export interface IAnnounce{
    id: IAnnounceId;
    announce: string;
    playerId: IPlayerId;
    setId(id: IAnnounceId): void;
    getId(): IAnnounceId;
    getAnnounce(): string;
    setAnnounce(announce: string): void;
    getPlayerId(): string;
    setPlayerId(playerId: string): void;
}

export class Announce implements IAnnounce{
    id: IAnnounceId;
    announce: string;
    playerId: IPlayerId;
    setId(id: IAnnounceId){
        this.id = id;
    }
    getId(): IAnnounceId{
        return this.id;
    }
    setAnnounce(announce: string){
        this.announce = announce;
    }
    getAnnounce(): string{
        return this.announce;
    }
    setPlayerId(playerId: IPlayerId){
        this.playerId = playerId;
    }
    getPlayerId(): IPlayerId{
        return this.playerId;
    }
}