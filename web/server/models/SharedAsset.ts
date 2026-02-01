import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Asset } from './Asset.js';
import { Game } from './Game.js';

@Table({
  timestamps: true,
  tableName: 'shared_assets',
})
export class SharedAsset extends Model {
  @PrimaryKey
  @ForeignKey(() => Game)
  @Column({
    type: DataType.STRING,
  })
  gameId!: string;
  @BelongsTo(() => Game)
  game!: Game;

  @PrimaryKey
  @ForeignKey(() => Asset)
  @Column({
    type: DataType.STRING,
  })
  assetId!: string;
  @BelongsTo(() => Asset)
  asset!: Asset;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}