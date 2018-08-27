import { firestore } from '../db';

export class AbstractRepository{
    connection: any;
    constructor(){
        this.connection = firestore;
    }
}