import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'private_assets',
})
export class PrivateAsset extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    references: { model: 'players', key: 'playerId' },
  })
  playerId!: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    references: { model: 'assets', key: 'assetId' },
  })
  assetId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}