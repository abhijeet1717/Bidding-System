import { BLOB,Sequelize,DataTypes,Model } from "sequelize";
import { sequelize } from "../database/db.connection";
import User from '../models/userModel';

class Address extends Model{
  public id!: number;
  public house_number!: string;
  public street_number!: number;
  public area!: string;
  public landmark!: string;
  public city!: string;
  public country!: string;
  public zip_code!: number;
  public state!: string;
  public status!: boolean;
  public user_id!: number;
  public addressType! : string;
}

Address.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    house_number : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street_number : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    area : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    landmark : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references:{
        model: User,
        key:"id",
    },
  },
    addressType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
    {
      sequelize,
      tableName: 'addresses',
    }
)


Address.sync();
console.log("The table for the User model was just (re)created!");

// User.hasMany(Address, {foreignKey : 'id'})
export default Address;