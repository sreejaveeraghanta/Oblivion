import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Player } from './Player.js';
import { Asset } from './Asset.js';

@Table({
  timestamps: true,
  tableName: 'private_assets',
})
export class PrivateAsset extends Model {
  @PrimaryKey
  @ForeignKey(() => Player)
  @Column({
    type: DataType.STRING,
  })
  playerId!: string;
  @BelongsTo(() => Player)
  player!: Player;
  
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