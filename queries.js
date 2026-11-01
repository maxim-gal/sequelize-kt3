import sequelize from './database.js';
import { Category, Product } from './models/index.js';
import { Op } from 'sequelize';

async function runQueries() {
  try {
    await sequelize.authenticate();

    // 1. Все товары с категориями (include)
    console.log('\n1. Все товары с категориями:');
    const allProducts = await Product.findAll({ include: { model: Category, as: 'category' } });
    allProducts.forEach(p => console.log(`${p.name} - ${p.price} (${p.category.name})`));

    // 2. Товары дороже 1000 (Op.gt)
    console.log('\n2. Товары дороже 1000:');
    const expensive = await Product.findAll({ where: { price: { [Op.gt]: 1000 } } });
    expensive.forEach(p => console.log(`${p.name} - ${p.price}`));

    // 3. Товары конкретной категории (where + include)
    console.log('\n3. Товары категории "Электроника":');
    const electronics = await Product.findAll({
      include: { model: Category, as: 'category', where: { name: 'Электроника' } }
    });
    electronics.forEach(p => console.log(`${p.name}`));

    // 4. Создать товар (create)
    console.log('\n4. Создание нового товара:');
    const newProduct = await Product.create({ name: 'Наушники', price: 4000, categoryId: 1 });
    console.log(`Создан товар: ${newProduct.name}`);

    // 5. Найти товар по названию (Op.like)
    console.log('\n5. Поиск по названию (содержит "ноут"):');
    const search = await Product.findAll({ where: { name: { [Op.like]: '%ноут%' } } });
    search.forEach(p => console.log(`${p.name}`));

    // 6. Дополнительно: findByPk (из общих требований)
    console.log('\n6. Товар по ID = 1 (findByPk):');
    const byPk = await Product.findByPk(1);
    console.log(byPk ? byPk.name : 'Не найден');

  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
runQueries();
