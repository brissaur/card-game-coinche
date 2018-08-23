import { Player } from '../players/model';
import {DocumentSnapshot} from "@google-cloud/firestore";

export const extract = (player: Player) => {
    let document = {
        firstname: player.getFirstname(),
        isFakePlayer: player.getIsFakePlayer(),
    };
    return document;
};

export const hydrate = (document: DocumentSnapshot, player: Player) => {
    player.setId(document.id);
    player.setFirstname(document.get('firstname'));
    player.setIsFakePlayer(document.get('isFakePlayer'));

    return player;
};