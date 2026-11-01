import Category from './Category.js';
import Product from './Product.js';

// Связь 1:N
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export { Category, Product };
