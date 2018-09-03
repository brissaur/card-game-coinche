import {ITrick} from "../tricks/model";

type IRoundId = string;

export interface IRound{
    documentId: IRoundId;
    tricks: ITrick[];
    setDocumentId(documentId: IRoundId): void;
    getDocumentId(): IRoundId;
    set(tricks: ITrick[]): void;
    get(): ITrick[];
}

export class Round implements IRound
{
    documentId: IRoundId;
    tricks: ITrick[];
    setDocumentId(documentId: IRoundId){
        this.documentId = documentId;
    }
    getDocumentId(): IRoundId
    {
        return this.documentId;
    }
    set(tricks: ITrick[]): void
    {
        this.tricks = tricks;
    }
    get(): ITrick[]
    {
        return this.tricks;
    }
}