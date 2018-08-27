import {Player} from '../../players/model';
import {DocumentSnapshot} from "@google-cloud/firestore";

export const extract = (player: Player) => {
    return {
        firstname: player.getFirstname(),
        isFakePlayer: player.getIsFakePlayer()
    };
};

export const hydrate = (document: DocumentSnapshot, player: Player) => {
    player.setId(document.id);
    player.setFirstname(document.get('firstname'));
    player.setIsFakePlayer(document.get('isFakePlayer'));

    return player;
};