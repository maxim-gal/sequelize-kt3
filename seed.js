import sequelize from './database.js';
import { Category, Product } from './models/index.js';

async function seed() {
  try {
    await sequelize.sync({ force: true });
    
    // Создаем категории
    const categories = await Category.bulkCreate([
      { name: 'Электроника' },
      { name: 'Одежда' },
      { name: 'Книги' }
    ]);

    // Создаем продукты (3-5 записей)
    await Product.bulkCreate([
      { name: 'Смартфон', price: 25000, categoryId: categories[0].id },
      { name: 'Ноутбук', price: 60000, categoryId: categories[0].id },
      { name: 'Футболка', price: 1500, categoryId: categories[1].id },
      { name: 'Джинсы', price: 3500, categoryId: categories[1].id },
      { name: 'Учебник JS', price: 1200, categoryId: categories[2].id }
    ]);

    console.log('База данных успешно заполнена!');
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
seed();
