import {AbstractRepository} from '../abstractRepository';
import {Table} from "../../tables/model";
import CollectionReference = FirebaseFirestore.CollectionReference;
import {extract, hydrate, extractAnnounce, extractPlayer} from './tableHydrator';
import {IPlayer} from "../../players/model";
import {IAnnounce} from "../../announces/model";
import DocumentReference = FirebaseFirestore.DocumentReference;
import WriteResult = FirebaseFirestore.WriteResult;

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
    async getTableById(tableId: string): Promise<Table>{
        return await hydrate(this.collection.doc(tableId), new Table());
    }
    async upsertTable(table: Table): Promise<Table>{
        console.log('upserTable', table);
        let doc: DocumentReference;
        if(table.getDocumentId()){
            // update main object
            console.log('update table');
            doc = await this.collection.doc(table.getDocumentId());
            await doc.update(extract(table));
        }else{
            console.log('create table');
            // create
            doc = await this.collection.add(extract(table));
        }

        //upsert announces
        let promises: any[] = [];
        console.log('announce from table', table.getAnnounces());
        table.getAnnounces().map(announce => {
            if(announce.getDocumentId()){
                promises.push(doc.collection('announces').doc(announce.getDocumentId()).set(extractAnnounce(announce)));
            }else{
                promises.push(doc.collection('announces').add(extractAnnounce(announce)));
            }

        });
        await Promise.all(promises);

        //upsert players
        promises = [];
        table.getPlayers().map(player => {
            if(player.getDocumentId()){
                promises.push(doc.collection('players').doc(player.getDocumentId()).set(extractPlayer(player)));
            }else{
                promises.push(doc.collection('players').add(extractPlayer(player)));
            }
        });

        await Promise.all(promises);

        table = await hydrate(doc, table);

        return table;
    }
}

export const repository = new TableRepository();