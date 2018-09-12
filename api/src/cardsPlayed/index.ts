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
import {
    CARD_PLAY_SERVER_WS,
    CARD_PLAYED_SERVER_WS,
    PLAYER_ACTIVE_SERVER_WS,
    ROUND_MODE,
    TRICK_END_SERVER_WS
} from "../websocket";
import {formatMsgForWs} from "../websocket/helper";
import {modes} from "../announces/business";
import {dealCards} from "../players/business";
import {Round} from "../rounds/model";

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
    const playerId = eventData.playerId ? eventData.playerId : session.getPlayerDocumentId();
    cardPlayed.setPlayerId(playerId);
    table.setCardsPlayed([...table.getCardsPlayed(), cardPlayed]);
    // update card on player
    table.setPlayers(table.getPlayers().map(p => {
        if(p.getDocumentId() === playerId   ){
            p.setCards(p.getCards().filter(c => c.getCardId() !== eventData.card.id));
        }
        return p;
    }));

    await tableRepository.upsertTable(table);

    ws.send(formatMsgForWs(CARD_PLAYED_SERVER_WS, {
        card: {
            cardId: cardPlayed.getCardId(),
            playerId: cardPlayed.getPlayerId()
        },
    }, {}));

    if (table.getCardsPlayed().length === 4) {
        console.log('should create trick');
        // add a trick with cardsPlayed
        const trick = new Trick();
        trick.set(table.getCardsPlayed());
        table.setTricks([...table.getTricks(), trick]);

        await tableRepository.upsertTable(table);

        await tableRepository.emptyCollection(tableRepository.getCardsPlayedSubCollection(table));

        ws.send(formatMsgForWs(TRICK_END_SERVER_WS, {}, {}));


        if (table.getTricks().length === 8) {
            // add new round

            const round = new Round();
            round.set(table.getTricks());
            table.setRounds([...table.getRounds(), round]);

            await tableRepository.upsertTable(table);
            // => remove tricks
            await tableRepository.emptyCollection(tableRepository.getTricksSubCollection(table));

            // => next round
            // deal cards
            table.setPlayers(dealCards(table.getPlayers()));
            // const players = await getPlayersOnTable(tableId);
            // const playersWithCards = dealCards(players);
            // const playersRef = getPlayersCollection(tableId);

            // await playersWithCards.forEach(async (player) => {
            //     playersRef.doc(player.id).update({ cards: player.cards });
            // });
            // update next player, dealer, mode
            // const fbTableRef = getTableById(tableId);
            // const nextDealer = await fbTableRef.then(snapshot => snapshot.data().firstPlayerId);
            const nextPlayer = await nextPlayerPlusPlus(table, table.getFirstPlayerId());
            await fbTableRef.update(
                {
                    mode: 'announce',
                    firstPlayerId: nextPlayer,
                    currentPlayerId: nextPlayer,
                },
                { merge: true },
            );
            return;
        }

    }

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