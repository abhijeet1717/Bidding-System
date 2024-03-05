import { Sequelize,DataTypes,Model } from "sequelize";
import { sequelize } from "../database/db.connection";
import User from '../models/userModel';

class Session extends Model {
    public id!: number;
    public uid!: number;
    public isUserActive!: boolean;
  }

  Session.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    isUserActive : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sessions',
  }
)

Session.sync();
console.log("The table for the session model was just (re)created!");

export default Session;




