import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'players',
})
export class Player extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  playerId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  playerName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: { model: 'games', key: 'gameId' },
  })
  gameId!: string;

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