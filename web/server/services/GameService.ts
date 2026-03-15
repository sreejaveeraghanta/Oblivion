import { Game } from "../models/Game.js";
import { gameStatus } from "../../common/constants.js"

export class GameService {
    // but this is per GameService instance and not per Game? idk gotta think about this
    currentGameStatus: gameStatus = gameStatus.NOT_STARTED;

    static async createGame(gameId: string) {
        return await Game.create({ gameId });
    }

    static async getGameById(gameId: string) {
        return await Game.findByPk(gameId);
    }

    static async updateGameStatus(gameId: string, gameStatus: gameStatus) {
        const game = await Game.findByPk(gameId);
        if (game) {
            game.gameStatus = gameStatus;
            await game.save();
        }
        return game;
    }

    // TODO: elapsed time logic will need to account for pausing and resuming the game
    // elapstedTime is DATETIME in the Game model but we can store it as an integer 
    // representing seconds and convert to a more readable format when needed?
    static async updateElapsedTime(gameId: string, elapsedTime: number) {
        const game = await Game.findByPk(gameId);
        if (game) {
            game.elapsedTime = elapsedTime;
            await game.save();
        }
        return game;
    }

    static async updateCurrentTurn(gameId: string, currentTurn: number) {
        const game = await Game.findByPk(gameId);
        if (game) {
            game.currentTurn = currentTurn;
            await game.save();
        }
        return game;
    }
}

// TODO: should we move this enum to a separate file since it will be used across multiple services and models?
