import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables';
import { getTricksCollection } from '../tricks';
import {Card, CardPlayed, ICard} from './model';
import { QuerySnapshot } from '@google-cloud/firestore';
import {IMessage} from "../websocket/types";
import ws from "ws";
import {ISession} from "../websocket/session";
import {repository as tableRepository} from '../repository/table/tableRepository';
import {computeNextPlayerForTrick} from "../tables/business";
import {Trick} from '../tricks/model';
import {possibleCards} from "../common";
import {CARD_PLAY_SERVER_WS, CARD_PLAYED_SERVER_WS, PLAYER_ACTIVE_SERVER_WS, ROUND_MODE} from "../websocket";
import {formatMsgForWs} from "../websocket/helper";
import {modes} from "../announces/business";

const COLLECTION_NAME = 'cardsPlayed';

export const getCardsPlayedCollection = (tableId: string) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 */
export const getCardsPlayedOnTable = async (tableId: string) => {
    const cardsPlayed: ICard[] = [];
    const cardsPlayedRef = getCardsPlayedCollection(tableId);
    await cardsPlayedRef
        .get()
        .then((snapshot: QuerySnapshot) => {
            snapshot.forEach((cardPlayed) => {
                cardsPlayed.push(cardPlayed.data() as ICard);
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return cardsPlayed;
};

const onAddCardPlayed = async (ws: WebSocket, session: ISession, message: IMessage) => {
    console.log('onAddCardPlayed');
    const eventData = message.payload;

    const table = await tableRepository.getTableById(session.getTableDocumentId());

    const cardPlayed = new CardPlayed();
    cardPlayed.setCardId(eventData.card.id);
    // in case of robot, we get its playerId, otherwise get it from session
    cardPlayed.setPlayerId(eventData.playerId ? eventData.playerId : session.getPlayerDocumentId());
    table.setCardsPlayed([...table.getCardsPlayed(), cardPlayed]);

    await tableRepository.upsertTable(table);

    console.log('cardsPlayed', table.getCardsPlayed());

    if (table.getCardsPlayed().length === 4) {
        console.log('should create trick');
        // add a trick with cardsPlayed
        const trick = new Trick();
        trick.set(table.getCardsPlayed());
        table.setTricks([...table.getTricks(), trick]);

        tableRepository.emptyCollection(tableRepository.getCardsPlayedSubCollection(table));
    }

    ws.send(formatMsgForWs(CARD_PLAYED_SERVER_WS, {
        card: cardPlayed.getCardId(),
    }, {}));

    const currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === cardPlayed.getPlayerId())[0];
    const nextPlayer = computeNextPlayerForTrick(table.getPlayers(), currentPlayer);

    ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
        playerId: nextPlayer.getDocumentId()
    }, {}));

    if(nextPlayer.getIsFakePlayer()){
        console.log('isFackPlayer', nextPlayer);
        const trump = table.getCurrentAnnounce().announce.slice(-1);
        console.log('trump', trump);
        const cards = possibleCards(
            trump,
            nextPlayer,
            table.getCardsPlayed().map(c => new Card(c.getCardId())),
        );

        const message = {
            type: CARD_PLAY_SERVER_WS,
            payload: {
                card: {
                    id: cards[0].getCardId()
                },
                playerId: nextPlayer.getDocumentId()
            },
            meta: {}
        };
        // call onAnnounce again to fake robot's played
        onAddCardPlayed(ws, session, message);
    }

};

export const actions: {[key: string]: any} = {
    "play": onAddCardPlayed
};