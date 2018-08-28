import { IPlayerId } from '../players/model';

//export const ANNOUNCE_PASS = 'pass';

export type IAnnounceId = string;

export interface IAnnounce{
    documentId: IAnnounceId;
    announce: string;
    playerId: IPlayerId;
    setDocumentId(documentId: IAnnounceId): void;
    getDocumentId(): IAnnounceId;
    getAnnounce(): string;
    setAnnounce(announce: string): void;
    getPlayerId(): string;
    setPlayerId(playerId: string): void;
}

export class Announce implements IAnnounce{
    documentId: IAnnounceId;
    announce: string;
    playerId: IPlayerId;
    setDocumentId(documentId: IAnnounceId){
        this.documentId = documentId;
    }
    getDocumentId(): IAnnounceId{
        return this.documentId;
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