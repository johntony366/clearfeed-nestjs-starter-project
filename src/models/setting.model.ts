import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Account } from './Account.model';

@Table({
  tableName: 'settings',
  timestamps: true,
  paranoid: true,
})
export class Setting extends Model<Setting> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM('string', 'number', 'boolean', 'json'),
    allowNull: false,
  })
  dataType: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId: number;

  @BelongsTo(() => Account)
  account: Account;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;
}
