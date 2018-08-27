import {AbstractRepository} from '../abstractRepository';
import CollectionReference = FirebaseFirestore.CollectionReference;
import { Player } from '../../players/model';
import {extract, hydrate} from './playerHydrator';

const PLAYER_COLLECTION = 'players';

class PlayerRepository extends AbstractRepository{
    collection: CollectionReference;
    constructor(){
        super();
        this.collection = this.connection.collection(PLAYER_COLLECTION);
    }
    getCollection(): CollectionReference{
        return this.collection;
    }
    async savePlayer(player: Player): Promise<Player>{
        console.log('save player');
        const doc = await this.collection.add(extract(player));

        player = hydrate(await doc.get(), player);

        return player;
    }
}

export const repository = new PlayerRepository();