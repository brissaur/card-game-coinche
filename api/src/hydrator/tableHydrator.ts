import { Table } from '../tables/model';
import { Player } from '../players/model';
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";

export const extract = (table: Table) => {
    let document = {
        currentPlayerId: table.getCurrentPlayerId(),
        firstPlayerId: table.getFirstPlayerId(),
        mode: table.getMode(),
        players: table.getPlayers().map(function(player: Player){
            return player.getId();
        })
    };
    return document;
};

export const hydrate = (document: DocumentSnapshot, table: Table) => {
    table.setId(document.id);
    table.setCurrentPlayerId(document.get('currentPlayerId'));
    table.setFirstPlayerId(document.get('firstPlayerId'));
    table.setMode(document.get('mode'));
    //table.setPlayers(document.get('players'));

    return table;
};