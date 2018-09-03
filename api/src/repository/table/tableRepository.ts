import {AbstractRepository} from '../abstractRepository';
import {ITable, Table} from "../../tables/model";
import CollectionReference = FirebaseFirestore.CollectionReference;
import {extract, hydrate, extractAnnounce, extractPlayer} from './tableHydrator';
import DocumentReference = FirebaseFirestore.DocumentReference;

const TABLE_COLLECTION = 'tables';
export const PLAYER_SUBCOLLECTION = 'players';
export const ANNOUNCE_SUBCOLLECTION = 'announces';

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
        return this.collection.doc(table.getDocumentId()).collection('announces');
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
            await doc.update(extract(table));
        }else{
            // create
            doc = await this.collection.add(extract(table));
        }

        //upsert announces
        let promises: any[] = [];
        table.getAnnounces().map(announce => {
            // console.log('upsert annonuces', announce);
            if(announce.getDocumentId()){
                console.log('announce exists');
                promises.push(doc.collection('announces').doc(announce.getDocumentId()).set(extractAnnounce(announce)));
            }else{
                console.log('announce DO NOT exists', announce);
                promises.push(doc.collection('announces').add(extractAnnounce(announce)));
            }
        });
        await Promise.all(promises);

        //upsert players
        promises = [];
        table.getPlayers().map(player => {
            console.log('upsert players');
            if(player.getDocumentId()){
                promises.push(doc.collection('players').doc(player.getDocumentId()).set(extractPlayer(player)));
            }else{
                promises.push(doc.collection('players').add(extractPlayer(player)));
            }
        });

        await Promise.all(promises);

        await hydrate(doc, table);
    }
}

export const repository = new TableRepository();