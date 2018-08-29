import { firestore } from '../db';
import {CollectionReference, DocumentSnapshot, QuerySnapshot} from "@google-cloud/firestore";

export class AbstractRepository{
    connection: any;
    constructor(){
        this.connection = firestore;
    }
    emptyCollection(collectionRef: CollectionReference): void
    {
        collectionRef.get().then((querySnapshot: QuerySnapshot) => {
            querySnapshot.forEach(async (snapshot: DocumentSnapshot) => {
                await collectionRef.doc(snapshot.id).delete();
            });
        });
    }
}