import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'categories' });

export default Category;
