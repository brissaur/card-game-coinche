import { Table } from '../../tables/model';
import {IPlayer, Player} from '../../players/model';
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import {IAnnounce} from "../../announces/model";

export const extract = (table: Table) => {
    return {
        currentPlayerId: table.getCurrentPlayerId(),
        firstPlayerId: table.getFirstPlayerId(),
        mode: table.getMode()
    };
};

export const hydrate = (document: DocumentSnapshot, table: Table) => {
    table.setId(document.id);
    table.setCurrentPlayerId(document.get('currentPlayerId'));
    table.setFirstPlayerId(document.get('firstPlayerId'));
    table.setMode(document.get('mode'));

    return table;
};

// extract player to be saved in table
export const extractPlayer = (player: IPlayer) => {
    return {
        cards: player.getCards(),
        firstname: player.getFirstname(),
        id: player.getId(),
        isFakePlayer: player.getIsFakePlayer(),
        pos: player.getPos()
    }
};

export const extractAnnounce = (announce: IAnnounce) => {
    return {
        announce: announce.getAnnounce(),
        playerId: announce.getPlayerId()
    }
};