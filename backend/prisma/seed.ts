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
      price: 4500.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 120,
    },
    {
      title: 'Корм для кошек Purina One Sterilcat 3 кг',
      description: 'Специальный корм для стерилизованных кошек. Контроль веса и поддержка мочевыводящей системы.',
      price: 1890.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 200,
    },
    {
      title: 'Игрушка для собак KONG Classic',
      description: 'Легендарная игрушка из прочной резины. Можно начинять лакомствами, подходит для жевания.',
      price: 890.00,
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
      price: 650.00,
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
      price: 1450.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
      ],
      stockQuantity: 45,
    },
    {
      title: 'Переноска для кошек пластиковая',
      description: 'Прочная переноска с металлической дверцей и вентиляционными отверстиями.',
      price: 2200.00,
      rating: 4.2,
      images: [
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 30,
    },
    {
      title: 'Витамины для собак с глюкозамином 90 таб.',
      description: 'Поддержка суставов и связок. Комплекс с глюкозамином, хондроитином и MSM.',
      price: 1780.00,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
      ],
      stockQuantity: 75,
    },
    {
      title: 'Когтеточка для кошек с домиком',
      description: 'Многоуровневая когтеточка с домиком, лежаком и игрушкой на верёвке.',
      price: 3500.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      ],
      stockQuantity: 25,
    },
    {
      title: 'Шампунь для собак гипоаллергенный 500 мл',
      description: 'Мягкий шампунь для чувствительной кожи. Без сульфатов и парабенов.',
      price: 750.00,
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
      price: 420.00,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
      ],
      stockQuantity: 250,
    },
    {
      title: 'Ошейник для собак с адресником',
      description: 'Нейлоновый ошейник с металлической пряжкой и жетоном для гравировки.',
      price: 550.00,
      rating: 4.0,
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      ],
      stockQuantity: 140,
    },
    {
      title: 'Автокормушка для кошек 3 л',
      description: 'Автоматическая кормушка с таймером. До 4 приёмов пищи в день.',
      price: 2800.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      ],
      stockQuantity: 40,
    },
    {
      title: 'Домик для кошек плюшевый',
      description: 'Мягкий домик-лежанка с съёмной подушкой. Для кошек до 5 кг.',
      price: 1650.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 55,
    },
    {
      title: 'Корм для попугаев зерновая смесь 1 кг',
      description: 'Сбалансированная смесь зёрен для средних и крупных попугаев.',
      price: 380.00,
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
      price: 1950.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1519163214327-9f0a563e0c6a?w=800',
        'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
        'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
      ],
      stockQuantity: 35,
    },
    {
      title: 'Корм для рыбок хлопья 100 г',
      description: 'Универсальный корм в хлопьях для всех видов аквариумных рыб.',
      price: 320.00,
      rating: 4.2,
      images: [
        'https://images.unsplash.com/photo-1519163214327-9f0a563e0c6a?w=800',
        'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
        'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
      ],
      stockQuantity: 220,
    },
    {
      title: 'Клетка для грызунов 3-этажная',
      description: 'Просторная клетка с полками, лестницами и колесом для хомяков.',
      price: 4200.00,
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
      price: 290.00,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800',
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      ],
      stockQuantity: 160,
    },
    {
      title: 'Игрушка для кошек с кошачьей мятой',
      description: 'Мягкая игрушка-мышка с мятой. Набор из 3 штук.',
      price: 450.00,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      ],
      stockQuantity: 200,
    },
    {
      title: 'Пеленки впитывающие для собак 60x60 см 30 шт',
      description: 'Супервпитывающие пеленки с гелевым наполнителем и клейкими уголками.',
      price: 890.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 130,
    },
    {
      title: 'Корм для собак мелких пород 2 кг',
      description: 'Гранулы уменьшенного размера для собак до 10 кг. С курицей и риском.',
      price: 1250.00,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
      ],
      stockQuantity: 95,
    },
    {
      title: 'Шлейка для собак мягкая',
      description: 'Анатомическая шлейка с мягкими подушечками и светоотражателями.',
      price: 1100.00,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      ],
      stockQuantity: 70,
    },
    {
      title: 'Корм для кошек влажный паучи 85 г x 12',
      description: 'Набор влажного корма с курицей, говядиной и рыбой. Без злаков.',
      price: 780.00,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1589924691195-41432c84c6c3?w=800',
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      ],
      stockQuantity: 180,
    },
    {
      title: 'Поилка автоматическая для кошек 2 л',
      description: 'Фонтан-поилка с фильтром и бесшумным насосом. Мотивация пить больше.',
      price: 2100.00,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      ],
      stockQuantity: 50,
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`✅ ${products.length} products created`);

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