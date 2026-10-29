import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Создаём admin-пользователя
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@petgoods.com' },
    update: {},
    create: {
      email: 'admin@petgoods.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created/verified');

  // Промокод SAVE10
  await prisma.promoCode.upsert({
    where: { code: 'SAVE10' },
    update: {},
    create: {
      code: 'SAVE10',
      discountPercentage: 10,
      isActive: true,
    },
  });
  console.log('✅ PromoCode SAVE10 created/verified');

  // Товары
  const products = [
    {
      title: 'Корм для собак Royal Canin Adult 15 кг',
      description: 'Полнорационный сухой корм для взрослых собак средних пород. Поддерживает здоровье кожи, шерсти и пищеварения.',
      price: 45.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 120,
    },
    {
      title: 'Корм для кошек Purina One Sterilcat 3 кг',
      description: 'Специальный корм для стерилизованных кошек. Контроль веса и поддержка мочевыводящей системы.',
      price: 112.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=800',
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
        'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800',
      ],
      stockQuantity: 200,
    },
    {
      title: 'Игрушка для собак KONG Classic',
      description: 'Легендарная игрушка из прочной резины. Можно начинять лакомствами, подходит для жевания.',
      price: 89.00,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      ],
      stockQuantity: 85,
    },
    {
      title: 'Лежак для кошек мягкий 50x40 см',
      description: 'Уютный лежак с бортиками из плюша. Машинная стирка, антискользящее дно.',
      price: 1290.00,
      rating: 4.3,
      images: [
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 60,
    },
    {
      title: 'Наполнитель для кошачьего туалета комкующийся 10 л',
      description: 'Бентонитовый наполнитель с отличным комкованием и контролем запаха.',
      price: 65.00,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      ],
      stockQuantity: 300,
    },
    {
      title: 'Поводок-рулетка для собак 5 м',
      description: 'Рулетка с плавным тормозом и эргономичной ручкой. Для собак до 25 кг.',
      price: 145.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
        'https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?w=800',
      ],
      stockQuantity: 45,
    },
    {
      title: 'Переноска для кошек пластиковая',
      description: 'Прочная переноска с металлической дверцей и вентиляционными отверстиями.',
      price: 220.00,
      rating: 4.2,
      images: [
        'https://images.unsplash.com/photo-1516139008210-96e45dccd83b?w=800',
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 30,
    },
    {
      title: 'Витамины для собак с глюкозамином 90 таб.',
      description: 'Поддержка суставов и связок. Комплекс с глюкозамином, хондроитином и MSM.',
      price: 67.00,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1581888227599-779811939961?w=800',
        'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800',
        'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800',
      ],
      stockQuantity: 75,
    },
    {
      title: 'Когтеточка для кошек с домиком',
      description: 'Многоуровневая когтеточка с домиком, лежаком и игрушкой на верёвке.',
      price: 59.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800',
      ],
      stockQuantity: 25,
    },
    {
      title: 'Шампунь для собак гипоаллергенный 500 мл',
      description: 'Мягкий шампунь для чувствительной кожи. Без сульфатов и парабенов.',
      price: 75.00,
      rating: 4.1,
      images: [
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
      ],
      stockQuantity: 110,
    },
    {
      title: 'Миска для кошек керамическая с подставкой',
      description: 'Две керамические миски на деревянной подставке. Не скользит, легко мыть.',
      price: 980.00,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
      ],
      stockQuantity: 90,
    },
    {
      title: 'Лакомство для собак сушёное легкое 200 г',
      description: 'Натуральное лакомство из говяжьего легкого. Без добавок и консервантов.',
      price: 42.00,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
      ],
      stockQuantity: 250,
    },
    {
      title: 'Ошейник для собак с адресником',
      description: 'Нейлоновый ошейник с металлической пряжкой и жетоном для гравировки.',
      price: 55.00,
      rating: 4.0,
      images: [
        'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      ],
      stockQuantity: 140,
    },
    {
      title: 'Автокормушка для кошек 3 л',
      description: 'Автоматическая кормушка с таймером. До 4 приёмов пищи в день.',
      price: 280.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      ],
      stockQuantity: 40,
    },
    {
      title: 'Домик для кошек плюшевый',
      description: 'Мягкий домик-лежанка с съёмной подушкой. Для кошек до 5 кг.',
      price: 165.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=800',
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 55,
    },
    {
      title: 'Корм для попугаев зерновая смесь 1 кг',
      description: 'Сбалансированная смесь зёрен для средних и крупных попугаев.',
      price: 38.00,
      rating: 4.3,
      images: [
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
        'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800',
        'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800',
      ],
      stockQuantity: 180,
    },
    {
      title: 'Аквариумный фильтр внутренний',
      description: 'Фильтр с аэрацией для аквариумов до 100 л. Регулировка мощности.',
      price: 195.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800',
        'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
        'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
      ],
      stockQuantity: 35,
    },
    {
      title: 'Корм для рыбок хлопья 100 г',
      description: 'Универсальный корм в хлопьях для всех видов аквариумных рыб.',
      price: 12.00,
      rating: 4.2,
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
        'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
      ],
      stockQuantity: 220,
    },
    {
      title: 'Клетка для грызунов 3-этажная',
      description: 'Просторная клетка с полками, лестницами и колесом для хомяков.',
      price: 420.00,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800',
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      ],
      stockQuantity: 20,
    },
    {
      title: 'Наполнитель для грызунов древесный 10 л',
      description: 'Гранулы из прессованных опилок. Экологичный и впитывающий.',
      price: 29.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800',
        'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      ],
      stockQuantity: 160,
    },
    {
      title: 'Игрушка для кошек с кошачьей мятой',
      description: 'Мягкая игрушка-мышка с мятой. Набор из 3 штук.',
      price: 53.00,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800',
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 200,
    },
    {
      title: 'Пеленки впитывающие для собак 60x60 см 30 шт',
      description: 'Супервпитывающие пеленки с гелевым наполнителем и клейкими уголками.',
      price: 89.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 130,
    },
    {
      title: 'Корм для собак мелких пород 2 кг',
      description: 'Гранулы уменьшенного размера для собак до 10 кг. С курицей и риском.',
      price: 120.00,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
      ],
      stockQuantity: 95,
    },
    {
      title: 'Шлейка для собак мягкая',
      description: 'Анатомическая шлейка с мягкими подушечками и светоотражателями.',
      price: 111.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      ],
      stockQuantity: 70,
    },
    {
      title: 'Корм для кошек влажный паучи 85 г x 12',
      description: 'Набор влажного корма с курицей, говядиной и рыбой. Без злаков.',
      price: 77.00,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 180,
    },
    {
      title: 'Поилка автоматическая для кошек 2 л',
      description: 'Фонтан-поилка с фильтром и бесшумным насосом. Мотивация пить больше.',
      price: 228.99,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      ],
      stockQuantity: 50,
    },
  ];

  const existingProducts = await prisma.product.count();

  if (existingProducts > 0) {
    console.log(`⏭️  Products already exist (${existingProducts}), skipping product seed`);
  } else {
    await prisma.product.createMany({ data: products });
    console.log(`✅ ${products.length} products created`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });