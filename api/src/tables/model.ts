import {IPlayerId, IPlayer } from '../players/model';
import {IAnnounce} from '../announces/model';
import {ITrick} from "../tricks/model";
import {ICard, ICardPlayed} from "../cardsPlayed/model";

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
    getDocumentId(): ITableId;
    setDocumentId(documentId: ITableId): void;
    setCurrentAnnounce(announce: IAnnounce): void;
    getCurrentAnnounce(): IAnnounce;
    getPlayers(): IPlayer[];
    setPlayers(players: IPlayer[]): void;
    setCurrentPlayerId(currentPlayerId: IPlayerId): void;
    getCurrentPlayerId(): IPlayerId;
    setTricks(tricks: ITrick[]): void;
    getTricks(): ITrick[];
    setCardsPlayed(cardsPlayed: ICardPlayed[]): void;
    getCardsPlayed(): ICardPlayed[];
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
    cardsPlayed: ICardPlayed[];
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
}

export const createTable = (): Table =>
{
    return new Table();
};


// const hydratePlayer = (data: DocumentSnapshot, player: IPlayer): IPlayer => {
//     player.setDocumentId(data.id);
//     player.setCards(data.get('cards'));
//     player.setPos(data.get('pos'));
//     player.setFirstname(data.get('firstname'));
//     player.setIsFakePlayer(data.get('isFakePlayer'));
//
//     return player;
// };
//
// const hydrateAnnounces = (data: DocumentSnapshot, announce: IAnnounce): IAnnounce => {
//     announce.setDocumentId(data.id);
//     announce.setAnnounce(data.get('announce'));
//     announce.setPlayerId(data.get('playerId'));
//
//     return announce;
// };



// class TableModel{
//     document: DocumentReference;
//     players: IPlayer[];
//     constructor(document: DocumentReference){
//         this.document = document;
//     }
//     save(){
//         this.document.update();
//     }
//     async getCurrentPlayer(): Promise<IPlayer>{
//         const currentPlayerId = await this.document.get().then(d => d.get('currentPlayerId'));
//         return this.players.filter(p => p.getDocumentId() === currentPlayerId)[0];
//     }
//     async getPlayers(){
//         const players: Player[] = [];
//         await this.document.collection('players').get()
//             .then((snapshot) => {
//                 snapshot.forEach((p) => {
//                     players.push(hydratePlayer(p, new Player()));
//                 });
//             })
//             .catch((err) => {
//                 // eslint-disable-next-line no-console
//                 console.log('Error getting documents', err);
//             });
//         return players;
//     }
//     async getAnnounce(){
//         const announces: Announce[] = [];
//         await this.document.collection('announces').get()
//             .then((snapshot) => {
//                 snapshot.forEach((a) => {
//                     announces.push(hydrateAnnounce(a, new Announce()));
//                 });
//             })
//             .catch((err) => {
//                 // eslint-disable-next-line no-console
//                 console.log('Error getting documents', err);
//             });
//         return players;
//     }
// }