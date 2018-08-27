import {AbstractRepository} from '../abstractRepository';
import {Table} from "../../tables/model";
import CollectionReference = FirebaseFirestore.CollectionReference;
import {extract, hydrate, extractAnnounce, extractPlayer} from './tableHydrator';
import {IPlayer} from "../../players/model";
import {IAnnounce} from "../../announces/model";
import DocumentReference = FirebaseFirestore.DocumentReference;
import WriteResult = FirebaseFirestore.WriteResult;

const TABLE_COLLECTION = 'tables';

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
        return hydrate(await this.collection.doc(tableId).get(), new Table());
    }
    async upsertTable(table: Table): Promise<Table>{
        console.log('upserTable', table);
        let doc: DocumentReference;
        if(table.getId()){
            // update main object
            console.log('update table');
            doc = await this.collection.doc(table.getId());
            await doc.update(extract(table));
        }else{
            console.log('create table');
            // create
            doc = await this.collection.add(extract(table));
        }

        //upsert announces
        let promises: any[] = [];
        table.getAnnounces().map(announce => {
            if(announce.getId()){
                promises.push(doc.collection('announces').doc(announce.getId()).update(extractAnnounce(announce)));
            }else{
                promises.push(doc.collection('announces').add(extractAnnounce(announce)));
            }

        });
        await Promise.all(promises);

        //upsert players
        promises = [];
        table.getPlayers().map(player => {
            console.log('player', player.getId());
            if(player.getId()){
                console.log('should update ....');
                // DO NO WHY, PROMISE NEVER RESOLVES
                //promises.push(doc.collection('players').doc(player.getId()).update(extractPlayer(player)));
            }else{
                let toto = extractPlayer(player);
                console.log('extractPlayer', toto);
                promises.push(doc.collection('players').add(toto));
            }

        });
        console.log('before promises', promises);
        await Promise.all(promises);

        table = hydrate(await doc.get(), table);

        return table;
    }
}

export const repository = new TableRepository();