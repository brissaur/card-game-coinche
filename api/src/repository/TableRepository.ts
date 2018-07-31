import {AbstractRepository} from './AbstractRepository';
import {Table} from "../tables";
import CollectionReference = FirebaseFirestore.CollectionReference;
import DocumentReference = FirebaseFirestore.DocumentReference;

const TABLE_COLLECTION = 'tables';

class TableRepository extends AbstractRepository{
    collection: CollectionReference;
    constructor(){
        super();
        this.collection = this.connection.collections(TABLE_COLLECTION);
    }
    getCollection(): CollectionReference{
        return this.collection;
    }
    async saveTable(table: Table): Promise<Table>{
        const doc = await this.collection.add(table);

        table.id = doc.id;

        return table;
    }
}

export const repository = new TableRepository();