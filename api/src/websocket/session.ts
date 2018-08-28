export interface ISession{
    playerDocumentId: string;
    tableDocumentId: string;
    setPlayerDocumentId(playerDocumentId: string): void;
    getPlayerDocumentId(): string;
    setTableDocumentId(tableDocumentId: string): void;
    getTableDocumentId(): string;
}


export class Session implements ISession{
    playerDocumentId: string;
    tableDocumentId: string;
    setPlayerDocumentId(playerDocumentId: string){
        this.playerDocumentId = playerDocumentId;
    }
    getPlayerDocumentId(): string{
        return this.playerDocumentId;
    }
    setTableDocumentId(tableDocumentId: string){
        this.tableDocumentId = tableDocumentId;
    }
    getTableDocumentId(): string{
        return this.tableDocumentId;
    }
}