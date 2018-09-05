import { Table } from '../../tables/model';
import {IPlayer, Player} from '../../players/model';
import { DocumentSnapshot } from "@google-cloud/firestore";
import {Announce, IAnnounce} from "../../announces/model";
import DocumentReference = FirebaseFirestore.DocumentReference;
import {ANNOUNCE_SUBCOLLECTION, CARD_PLAYED_SUBCOLLECTION, PLAYER_SUBCOLLECTION} from "./tableRepository";
import {ITrick} from "../../tricks/model";
import {CardPlayed, ICardPlayed} from "../../cardsPlayed/model";
import {IRound} from "../../rounds/model";

export const extract = (table: Table) => {
    return {
        currentPlayerId: table.getCurrentPlayerId(),
        firstPlayerId: table.getFirstPlayerId(),
        currentAnnounce: table.getCurrentAnnounce() ? extractAnnounce(table.getCurrentAnnounce()) : null,
        mode: table.getMode()
    };
};

export const hydrate = async (document: DocumentReference, table: Table): Promise<void> => {
    const documentData: DocumentSnapshot = await document.get();
    table.setDocumentId(documentData.id);
    table.setCurrentPlayerId(documentData.get('currentPlayerId'));
    table.setFirstPlayerId(documentData.get('firstPlayerId'));
    if(documentData.get('currentAnnounce')){
        const announce = new Announce();
        const data = documentData.get('currentAnnounce');
        announce.setPlayerId(data.playerId);
        announce.setAnnounce(data.announce);
        table.setCurrentAnnounce(announce);
    }
    table.setMode(documentData.get('mode'));

    // retrieve players / announces collection ?
    const playersData = await document.collection(PLAYER_SUBCOLLECTION).get()
        .then((q) => q.docs.map(
            q => document.collection(PLAYER_SUBCOLLECTION).doc(q.id)
        ));

    const players = await Promise.all(playersData.map(async (p) => {
        const player = new Player();
        await hydratePlayer(p, player);
        return player;
    }));

    table.setPlayers(players);

    const announcesDocuments = await document.collection(ANNOUNCE_SUBCOLLECTION).get()
        .then((q) => q.docs.map(
            q => document.collection(ANNOUNCE_SUBCOLLECTION).doc(q.id)
        ));

    const announces = await Promise.all(announcesDocuments.map(async (a) => {
        const announce = new Announce();
        await hydrateAnnounce(a, announce);
        return announce;
    }));

    table.setAnnounces(announces);

    const cardsPlayedDocuments = await document.collection(CARD_PLAYED_SUBCOLLECTION).get()
        .then((q) => q.docs.map(
            q => document.collection(CARD_PLAYED_SUBCOLLECTION).doc(q.id)
        ));

    const cardsPlayed = await Promise.all(cardsPlayedDocuments.map(async (cp) => {
        const cardPlayed = new CardPlayed();
        await hydrateCardPlayed(cp, cardPlayed);
        return cardPlayed;
    }));

    table.setCardsPlayed(cardsPlayed);
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

export const extractCardPlayed = (cardPlayed: ICardPlayed) => {
    return {
        cardId: cardPlayed.getCardId(),
        playerId: cardPlayed.getPlayerId()
    }
};

export const extractTrick = (trick: ITrick) => {
    return trick.get().map(c => extractCardPlayed(c));
};

export const extractRound = (round: IRound) => {
    return round.get().map(t => extractTrick(t));
};

const hydratePlayer = async (document: DocumentReference, player: IPlayer): Promise<void> => {
    const documentData: DocumentSnapshot = await document.get();
    player.setDocumentId(document.id);
    player.setCards(documentData.get('cards'));
    player.setPos(documentData.get('pos'));
    player.setFirstname(documentData.get('firstname'));
    player.setIsFakePlayer(documentData.get('isFakePlayer'));
};

const hydrateAnnounce = async (document: DocumentReference, announce: IAnnounce): Promise<void> => {
    const documentData: DocumentSnapshot = await document.get();
    announce.setDocumentId(document.id);
    announce.setAnnounce(documentData.get('announce'));
    announce.setPlayerId(documentData.get('playerId'));
};

export const extractAnnounce = (announce: IAnnounce) => {
    return {
        announce: announce.getAnnounce(),
        playerId: announce.getPlayerId()
    }
};

const hydrateCardPlayed = async (document: DocumentReference, cardsPlayed: ICardPlayed): Promise<void> => {
    const documentData: DocumentSnapshot = await document.get();
    cardsPlayed.setDocumentId(document.id);
    cardsPlayed.setCardId(documentData.get('cardId'));
    cardsPlayed.setPlayerId(documentData.get('playerId'));
};