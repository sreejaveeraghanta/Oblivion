import { Player } from "../models/Player.js";

export class PlayerService {
  static async createPlayer(playerId: string, playerName: string, gameId: string, turnNumber: number) {
    return await Player.create({ playerId, playerName, gameId, turnNumber });
  }

  static async getPlayerById(playerId: string) {
    return await Player.findByPk(playerId);
  }

  static async updatePlayerConnectionStatus(playerId: string, isConnected: boolean) {
    const player = await Player.findByPk(playerId);
    if (player) {
      player.isConnected = isConnected;
      await player.save();
    }
    return player;
  }

  static async getPlayersByGameId(gameId: string) {
    return await Player.findAll({ where: { gameId } });
  }
}
