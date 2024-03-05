import { Module } from "module";
// const sequelize = new Sequelize('sqlite::memory');
// import {sequelize} from 'sequelize';
import { BLOB,Sequelize,DataTypes,Model } from "sequelize";
import { sequelize } from "../database/db.connection";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public status!: boolean;
  public profile!: Blob;
  public mobile_number!: number;
  public gender!: string;
  public dob!: string;
  public favoriteBook! : string;
}

User.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status : {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    profile: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    mobile_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    favoriteBook: {
      type: DataTypes.STRING,
      allowNull : false,
    }
  },
    {
      sequelize,
      tableName: 'users',
    }
)


User.sync();
console.log("The table for the User model was just (re)created!");

export default User;