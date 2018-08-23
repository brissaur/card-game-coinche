import { Player } from '../players/model';

export const modeAnnounce = 'announce';
export const modePlay = 'play';

export class Table{
    id: string;
    currentPlayerId: string = null;
    firstPlayerId: string = null;
    mode: string = null;
    players: Player[] = [];
    setId(id: string){
        this.id = id;
    }
    getId(): string{
        return this.id;
    }
    setCurrentPlayerId(currentPlayerId: string){
        this.currentPlayerId = currentPlayerId;
    }
    getCurrentPlayerId(): string{
        return this.currentPlayerId;
    }
    setFirstPlayerId(firstPlayerId: string){
        this.firstPlayerId = firstPlayerId;
    }
    getFirstPlayerId(): string{
        return this.firstPlayerId;
    }
    setMode(mode: string){
        this.mode = mode;
    }
    getMode(): string{
        return this.mode
    }
    setPlayers(players: Player[]){
        this.players = players;
    }
    getPlayers(): Player[]{
        return this.players;
    }
}

export const createTable = (): Table =>
{
    return new Table();
}