import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'games',
})
export class Game extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  gameId!: string;

  @Column({
    type: DataType.STRING,
    validate:
        { isIn: [['not_started', 'active', 'paused', 'ended', 'abandoned']] },
    defaultValue: 'not_started',
  })
  gameStatus!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  elapsedTime!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: { model: 'players', key: 'playerId' },
  })
  currentPlayer!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  currentTurn!: number;
}