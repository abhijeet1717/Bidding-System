import { BLOB,Sequelize,DataTypes,Model } from "sequelize";
import { sequelize } from "../database/db.connection";

class Category extends Model{
  public id!: number;
  public category_name!: string;
  public sub_categories!: string;
}

Category.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sub_categories : {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
    {
      sequelize,
      tableName: 'categories',
    }
)


Category.sync();
console.log("The table for the User model was just (re)created!");

export default Category;