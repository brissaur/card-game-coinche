import {AbstractRepository} from './AbstractRepository';
import CollectionReference = FirebaseFirestore.CollectionReference;
import { Player } from '../players';

const PLAYER_COLLECTION = 'players';

class PlayerRepository extends AbstractRepository{
    collection: CollectionReference;
    constructor(){
        super();
        this.collection = this.connection.collections(PLAYER_COLLECTION);
    }
    getCollection(){
        return this.collection;
    }
    async savePlayer(player: Player): Promise<Player>{
        const doc = await this.collection.add(player);

        player.id = doc.id;

        return player;
    }
}

export const repository = new PlayerRepository();