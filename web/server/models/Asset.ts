import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'assets',
})
export class Asset extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  assetId!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isShared!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  // URL or path to the asset media
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  assetMedia!: string;
}