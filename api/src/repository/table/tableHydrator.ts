import { Table } from '../../tables/model';
import {IPlayer, Player} from '../../players/model';
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import {Announce, IAnnounce} from "../../announces/model";
import DocumentReference = FirebaseFirestore.DocumentReference;
import {ANNOUNCE_SUBCOLLECTION, PLAYER_SUBCOLLECTION} from "./tableRepository";
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
import placeholder = require("lodash/fp/placeholder");

export const extract = (table: Table) => {
    return {
        currentPlayerId: table.getCurrentPlayerId(),
        firstPlayerId: table.getFirstPlayerId(),
        mode: table.getMode()
    };
};

export const hydrate = async (document: DocumentReference, table: Table) => {
    const documentData: DocumentSnapshot = await document.get();
    table.setDocumentId(documentData.id);
    table.setCurrentPlayerId(documentData.get('currentPlayerId'));
    table.setFirstPlayerId(documentData.get('firstPlayerId'));
    table.setMode(documentData.get('mode'));
    const playersData = await document.collection(PLAYER_SUBCOLLECTION).get()
        .then((q) => q.docs.map(q => q.data()));
    // how to retrieve players / announces collection ?
    table.setPlayers(playersData.map(p => hydratePlayer(p, new Player())));

    const announcesData = await document.collection(ANNOUNCE_SUBCOLLECTION).get()
        .then((q) => q.docs.map(q => q.data()));
    table.setAnnounces(announcesData.map(a => hydrateAnnounces(a, new Announce())));

    console.log('hydrate table after hydration', table);

    return table;
};

// extract player to be saved in table
export const extractPlayer = (player: IPlayer) => {
    return {
        cards: player.getCards(),
        firstname: player.getFirstname(),
        id: player.getDocumentId(),
        isFakePlayer: player.getIsFakePlayer(),
        pos: player.getPos()
    }
};

const hydratePlayer = (data: DocumentData, player: IPlayer): IPlayer => {
    player.setCards(data.cards);
    player.setPos(data.pos);
    player.setFirstname(data.firstname);
    player.setDocumentId(data.id);
    player.setIsFakePlayer(data.isFakePlayer);

    return player;
};

const hydrateAnnounces = (data: DocumentData, announce: IAnnounce): IAnnounce => {
    announce.setDocumentId(data.id);
    announce.setAnnounce(data.announce);
    announce.setPlayerId(data.playerId);

    return announce;
};

export const extractAnnounce = (announce: IAnnounce) => {
    return {
        announce: announce.getAnnounce(),
        playerId: announce.getPlayerId()
    }
};