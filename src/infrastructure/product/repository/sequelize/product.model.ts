import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false, type: DataType.CHAR(50) })
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL({ precision: 8, scale: 2 }),
  })
  declare price: number;
}
