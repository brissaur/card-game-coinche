import {Card, CardPlayed} from './model';
import {IMessage} from "../websocket/types";
import {ISession} from "../websocket/session";
import {repository as tableRepository} from '../repository/table/tableRepository';
import {computeNextPlayerForTrick} from "../tables/business";
import {Trick} from '../tricks/model';
import {possibleCards} from "../common";
import {
    CARD_PLAY_SERVER_WS,
    CARD_PLAYED_SERVER_WS,
    PLAYER_ACTIVE_SERVER_WS, ROUND_MODE,
    TRICK_END_SERVER_WS
} from "../websocket";
import {formatMsgForWs} from "../websocket/helper";
import {modes} from "../announces/business";
import {dealCards} from "../players/business";
import {Round} from "../rounds/model";
import {nextPlayerPlusPlus} from "../tables";
import WebSocket = require("ws");

const COLLECTION_NAME = 'cardsPlayed';

const onAddCardPlayed = async (ws: WebSocket, session: ISession, message: IMessage) => {
    // console.log('onAddcardPlayed', message);
    const eventData = message.payload;

    const table = await tableRepository.getTableById(session.getTableDocumentId());

    const cardPlayed = new CardPlayed();
    cardPlayed.setCardId(eventData.card.id);
    // in case of robot, we get its playerId, otherwise get it from session
    const playerId = eventData.playerId ? eventData.playerId : session.getPlayerDocumentId();
    cardPlayed.setPlayerId(playerId);
    table.setCardsPlayed([...table.getCardsPlayed(), cardPlayed]);
    // update card on player
    console.log('robin1 ',table.getCurrentPlayerId());
    table.setPlayers(table.getPlayers().map(p => {
        if(p.getDocumentId() === playerId   ){
            p.setCards(p.getCards().filter(c => c.getCardId() !== eventData.card.id));
        }
        return p;
    }));
    console.log('robin2 ',table.getCurrentPlayerId());
    await tableRepository.upsertTable(table);

    console.log('robin3 ',table.getCurrentPlayerId());
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
        console.log('before add trick',table.getTricks());
        table.setTricks([...table.getTricks(), trick]);

        console.log('after compute tricks', table.getTricks());

        await tableRepository.upsertTable(table);

        await tableRepository.emptyCollection(tableRepository.getCardsPlayedSubCollection(table));

        ws.send(formatMsgForWs(TRICK_END_SERVER_WS, {}, {}));

        console.log('tricks length', table.getTricks().length);

        if (table.getTricks().length === 1) {
            console.log('should create a round');
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
            console.log('current player', table.getCurrentPlayerId());
            const currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === table.getCurrentPlayerId())[0];
            console.log('current player', currentPlayer);
            await nextPlayerPlusPlus(table, currentPlayer);
            table.setMode(modes.ANNOUNCE);
            await tableRepository.upsertTable(table);

            console.log('new player active');

            ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
                playerId: table.getCurrentPlayerId()
            }, {}));

            console.log('new round mode');

            ws.send(formatMsgForWs(ROUND_MODE, {
                mode: modes.ANNOUNCE,
            }, {}));

            console.log('should return');

            return;
        }
        console.log('nope');

    }

    console.log('nope 2');

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