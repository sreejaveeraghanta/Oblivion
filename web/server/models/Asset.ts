import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'assets',
})
export class Asset extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
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