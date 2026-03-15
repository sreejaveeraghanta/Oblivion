import { Request, Response } from 'express';
import { PlayerService } from '../services/PlayerService.js';

export class PlayerController {
    // keep record of players client side but don't create players yet until game is started
    static async getPlayers(req: Request, res: Response) {
        const { gameId } = req.params;

        const players = await PlayerService.getPlayersByGameId(gameId);
        res.json(players);
    }

    static async createPlayer(req: Request, res: Response) {
        const { playerId, playerName, gameId, turnNumber } = req.body;

        const player = await PlayerService.createPlayer(playerId, playerName, gameId, turnNumber);
        res.status(201).json(player);
    }

    static async updatePlayerConnectionStatus(req: Request, res: Response) {
        const { playerId } = req.params;
        const { isConnected } = req.body;

        const player = await PlayerService.updatePlayerConnectionStatus(playerId, isConnected);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    }
}
