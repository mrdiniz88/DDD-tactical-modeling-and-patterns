import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: false })
  declare zipcode: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare active: boolean;

  @Column({ allowNull: false })
  declare rewardPoints: number;
}
