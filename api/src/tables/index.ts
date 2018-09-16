import { firestore } from '../db';
import { DocumentReference } from "@google-cloud/firestore";
import {ITable} from './model';
import {IPlayer} from "../players/model";
import {repository} from "../repository/table/tableRepository";
import {computeNextPlayerForTrick} from "./business";

export const COLLECTION_NAME = 'tables';

export const getTableById = (tableId: string): DocumentReference => {
    return firestore
        .collection(COLLECTION_NAME)
        .doc(tableId);
};

export async function nextPlayerPlusPlus(table: ITable, currentPlayer: IPlayer) {
    const nextPlayer = computeNextPlayerForTrick(table.getPlayers(), currentPlayer);
    table.setCurrentPlayerId(nextPlayer.getDocumentId());
    await repository.upsertTable(table);
}