import { getTableById } from '../tables';

const COLLECTION_NAME = 'rounds';

/**
 *
 * @param tableId
 * @returns {Promise<void>}
 */
export const getRoundsCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

export default getRoundsCollection;
