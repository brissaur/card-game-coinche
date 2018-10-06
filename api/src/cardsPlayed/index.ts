import {Card, CardPlayed} from './model';
import {IMessage} from "../websocket/types";
import {ISession} from "../websocket/session";
import {repository as tableRepository} from '../repository/table/tableRepository';
import {computeNextPlayerForTrick} from "../tables/business";
import {Trick} from '../tricks/model';
import {possibleCards} from "../common";
import {
    CARD_PLAY_SERVER_WS,
    CARD_PLAYED_SERVER_WS, CARDS_DEAL_SERVER_WS,
    PLAYER_ACTIVE_SERVER_WS, ROUND_MODE,
    TRICK_END_SERVER_WS
} from "../websocket";
import {formatMsgForWs} from "../websocket/helper";
import {modes} from "../announces/business";
import {dealCards} from "../players/business";
import {Round} from "../rounds/model";
import {nextPlayerPlusPlus} from "../tables";
const webSocket = require("ws");

const onAddCardPlayed = async (ws: webSocket, session: ISession, message: IMessage) => {
    // console.log('onAddcardPlayed', message);
    const eventData = message.payload;

    const table = await tableRepository.getTableById(session.getTableDocumentId());

    const cardPlayed = new CardPlayed();
    cardPlayed.setCardId(eventData.card.id);
    // in case of robot, we get its playerId, otherwise get it from session
    const playerId = eventData.playerId ? eventData.playerId : session.getPlayerDocumentId();
    table.setCurrentPlayerId(playerId);
    cardPlayed.setPlayerId(playerId);
    table.setCardsPlayed([...table.getCardsPlayed(), cardPlayed]);
    // update card on player
    table.setPlayers(table.getPlayers().map(p => {
        if(p.getDocumentId() === playerId   ){
            p.setCards(p.getCards().filter(c => c.getCardId() !== eventData.card.id));
        }
        return p;
    }));
    // set currentplayerId
    await tableRepository.upsertTable(table);

    ws.send(formatMsgForWs(CARD_PLAYED_SERVER_WS, {
        card: {
            cardId: cardPlayed.getCardId(),
            playerId: cardPlayed.getPlayerId()
        },
    }, {}));

    // console.log('cardPlayed length', table.getCardsPlayed().length);
    if (table.getCardsPlayed().length === 4) {
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
            // select currentPlayer before nextPlayerPlusPlus
            let currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === table.getCurrentPlayerId())[0];

            await nextPlayerPlusPlus(table, currentPlayer);

            // now retrieve the "real" currentPlayer
            currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === table.getCurrentPlayerId())[0];

            ws.send(formatMsgForWs(CARDS_DEAL_SERVER_WS, {
                cards: currentPlayer.getCards().map(c => c.getCardId())
            }, {}));

            table.setMode(modes.ANNOUNCE);
            await tableRepository.upsertTable(table);

            ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
                playerId: table.getCurrentPlayerId()
            }, {}));

            ws.send(formatMsgForWs(ROUND_MODE, {
                mode: modes.ANNOUNCE,
            }, {}));

            return;
        }
    }

    const currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === cardPlayed.getPlayerId())[0];
    const nextPlayer = computeNextPlayerForTrick(table.getPlayers(), currentPlayer);

    ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
        playerId: nextPlayer.getDocumentId()
    }, {}));

    if(nextPlayer.getIsFakePlayer()){
        const trump = table.getCurrentAnnounce().announce.slice(-1);
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
        await onAddCardPlayed(ws, session, message);
    }

};

export const actions: {[key: string]: any} = {
    "play": onAddCardPlayed
};