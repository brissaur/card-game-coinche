import { getTableById } from '../tables';
import { CollectionReference } from "@google-cloud/firestore";

const COLLECTION_NAME = 'rounds';

/**
 *
 * @param tableId
 * @returns CollectionReference
 */
export const getRoundsCollection = (tableId: string): CollectionReference => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};
