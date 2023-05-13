import { DataType, DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";
import { Post } from "./Post";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInputs
  extends Optional<UserAttributes, "id" | "isVerified"> {}

export class User
  extends Model<UserAttributes, UserInputs>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isVerified: Boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  }
);

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: "userId" });
