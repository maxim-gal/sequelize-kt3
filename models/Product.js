import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: 'products' });

export default Product;
