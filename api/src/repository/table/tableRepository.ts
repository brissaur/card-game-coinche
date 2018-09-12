import {AbstractRepository} from '../abstractRepository';
import {ITable, Table} from "../../tables/model";
import CollectionReference = FirebaseFirestore.CollectionReference;
import {
    extract,
    hydrate,
    extractAnnounce,
    extractPlayer,
    extractTrick,
    extractCardPlayed,
    extractRound
} from './tableHydrator';
import DocumentReference = FirebaseFirestore.DocumentReference;

const TABLE_COLLECTION = 'tables';
export const PLAYER_SUBCOLLECTION = 'players';
export const ANNOUNCE_SUBCOLLECTION = 'announces';
export const TRICK_SUBCOLLECTION = 'tricks';
export const CARD_PLAYED_SUBCOLLECTION = 'cardsPlayed';
export const ROUND_SUBCOLLECTION = 'round';

class TableRepository extends AbstractRepository{
    collection: CollectionReference;
    constructor(){
        super();
        this.collection = this.connection.collection(TABLE_COLLECTION);
    }
    getCollection(): CollectionReference{
        return this.collection;
    }
    getAnnouncesSubCollection(table: ITable): CollectionReference{
        return this.collection.doc(table.getDocumentId()).collection(ANNOUNCE_SUBCOLLECTION);
    }
    getCardsPlayedSubCollection(table: ITable): CollectionReference{
        return this.collection.doc(table.getDocumentId()).collection(CARD_PLAYED_SUBCOLLECTION);
    }
    getTricksSubCollection(table: ITable): CollectionReference{
        return this.collection.doc(table.getDocumentId()).collection(ROUND_SUBCOLLECTION)
    }
    async getTableById(tableId: string): Promise<Table>{
        const table = new Table();
        await hydrate(this.collection.doc(tableId), table);
        return table;
    }
    async upsertTable(table: Table): Promise<void>{
        let doc: DocumentReference;
        if(table.getDocumentId()){
            console.log('update table');
            // update main object
            doc = await this.collection.doc(table.getDocumentId());
            // console.log('extract table', extract(table));
            await doc.update(extract(table));

            // console.log('table updated');

        }else{
            // create
            doc = await this.collection.add(extract(table));
        }

        // upsert announces
        let promises: any[] = [];
        table.getAnnounces().map(announce => {
            // console.log('upsert annonuces', announce);
            if(announce.getDocumentId()){
                promises.push(doc.collection('announces').doc(announce.getDocumentId()).set(extractAnnounce(announce)));
            }else{
                promises.push(doc.collection('announces').add(extractAnnounce(announce)));
            }
        });
        await Promise.all(promises);

        // upsert players
        promises = [];
        console.log('upsert players');
        table.getPlayers().map(player => {
            if(player.getDocumentId()){
                console.log('player exists');
                promises.push(doc.collection(PLAYER_SUBCOLLECTION).doc(player.getDocumentId()).set(extractPlayer(player)));
            }else{
                console.log('player do not exits');
                promises.push(doc.collection(PLAYER_SUBCOLLECTION).add(extractPlayer(player)));
            }
        });

        await Promise.all(promises);

        // upsert tricks
        promises = [];
        console.log('upsert tricks');
        table.getTricks().map(trick => {
            if(trick.getDocumentId()){
                console.log('trick exists');
                promises.push(doc.collection(TRICK_SUBCOLLECTION).doc(trick.getDocumentId()).set({...extractTrick(trick)}));
            }else{
                console.log('trick do not exists');
                promises.push(doc.collection(TRICK_SUBCOLLECTION).add({...extractTrick(trick)}));
            }
        });

        await Promise.all(promises);

        // upsert cardsPlayed
        promises = [];
        console.log('upsert cardsPlayed', table.getCardsPlayed());
        table.getCardsPlayed().map(cardPlayed => {
            if(cardPlayed.getDocumentId()){
                console.log('cards exists');
                promises.push(doc.collection(CARD_PLAYED_SUBCOLLECTION).doc(cardPlayed.getDocumentId()).set(extractCardPlayed(cardPlayed)));
            }else{
                console.log('card is new');
                promises.push(doc.collection(CARD_PLAYED_SUBCOLLECTION).add(extractCardPlayed(cardPlayed)));
            }
        });

        await Promise.all(promises);

        // upsert rounds
        promises = [];
        console.log('upsert rounds', table.getRounds());
        table.getRounds().map(round => {
            if(round.getDocumentId()){
                console.log('rounds exists');
                promises.push(doc.collection(ROUND_SUBCOLLECTION).doc(round.getDocumentId()).set({...extractRound(round)}));
            }else{
                console.log('round is new');
                promises.push(doc.collection(ROUND_SUBCOLLECTION).add({...extractRound(round)}));
            }
        });

        await Promise.all(promises);

        console.log('hydrate');

        await hydrate(doc, table);
    }
}

export const repository = new TableRepository();