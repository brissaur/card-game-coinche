import {AbstractRepository} from './AbstractRepository';
import {Table} from "../tables/model";
import CollectionReference = FirebaseFirestore.CollectionReference;
import { extract, hydrate } from '../hydrator/tableHydrator';

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
    async saveTable(table: Table): Promise<Table>{
        const doc = await this.collection.add(extract(table));

        table = hydrate(await doc.get(), table);

        return table;
    }
}

export const repository = new TableRepository();