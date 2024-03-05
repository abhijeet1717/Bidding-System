import { Module } from "module";
import User from "./userModel";
const {BLOB ,Sequelize, DataTypes, Model} = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory');
import { sequelize } from "../database/db.connection";
import { Blob } from "buffer";


class Product extends Model {
  public id!: number;
  public product_name!: string;
  public description!: string;  
  public product_images!: Blob;
  public bidding!: number; 
  public bidder_id!: number;  
  public base_price!: number;
  public status!: boolean;
  public user_id!: number;
  public category_id!: number;
}

Product.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name : {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    description : {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    product_images : {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    bidding : {
        type: DataTypes.INTEGER, 
        //allowNull: true,
    },
    bidder_id : {
      type: DataTypes.INTEGER,
      //allowNull: true,
  },
    base_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        //allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references:{
        model: User,
        key: "id",
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    },
    {
        sequelize,
        tableName: 'products',
    }
)

// Product.belongsTo(User,{
  // foreignKey : 'user_id',
  //as: 'user_id',
// })

// User.hasMany(Product, {
//   foreignKey: 'user_d',
//   //as: 'products',
// })

Product.sync();
console.log("The table for the product model was just (re)created!");

export default Product;