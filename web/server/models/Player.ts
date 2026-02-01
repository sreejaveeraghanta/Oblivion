import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Game } from './Game.js';

@Table({
  timestamps: true,
  tableName: 'players',
})
export class Player extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  playerId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  playerName!: string;

  @ForeignKey(() => Game)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gameId!: string;
  @BelongsTo(() => Game)
  game!: Game;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isConnected!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  turnNumber!: number;
}