import {AbstractRepository} from '../abstractRepository';
import CollectionReference = FirebaseFirestore.CollectionReference;
import { Player } from '../../players/model';
import {extract, hydrate} from './playerHydrator';
import DocumentReference = FirebaseFirestore.DocumentReference;

const PLAYER_COLLECTION = 'players';

class PlayerRepository extends AbstractRepository{
    collection: CollectionReference;
    constructor(){
        super();
        this.collection = this.connection.collection(PLAYER_COLLECTION);
    }
    // async findOneById(documentId: string): Promise<DocumentReference> {
    //     return this.collection.doc(documentId);
    // }
    async savePlayer(player: Player): Promise<Player>{
        const doc = await this.collection.add(extract(player));

        player = hydrate(await doc.get(), player);

        return player;
    }
}

export const repository = new PlayerRepository();