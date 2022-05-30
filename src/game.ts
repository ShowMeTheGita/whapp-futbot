import fs from 'fs';
import { GameInterface } from './interfaces/game.interface';

export class Game {
    constructor() { }

    public gameData: GameInterface = {
        status: false,
        date: 'TBA',
        hour: 'TBA',
        location: 'TBA',
        playerCount: 0,
        players: [],
    };

    private isGameInProgress: boolean = false;

    public GameInProgress(): boolean {
        return this.isGameInProgress;
    }

    public ChangeGameStatus() {
        this.isGameInProgress = !this.isGameInProgress;
    }

    private SetGameInProgress() {
        this.isGameInProgress = true;
    }

    private SetGameNotInProgress() {
        this.isGameInProgress = false;
    }

    public StartFreshGame() {
        this.SetGameInProgress();
    }

    public FinishAndResetGame() {
        this.SetGameNotInProgress();
        this.reset();
        fs.unlinkSync('./game-state.json');
    }

    public FinishAndReuseGame() {

    }

    public reset() {
        this.gameData.status = this.isGameInProgress;
        this.gameData.date = 'TBA';
        this.gameData.hour = 'TBA';
        this.gameData.location = 'TBA';
        this.gameData.playerCount = 0;
        this.gameData.players = [];
    }
}