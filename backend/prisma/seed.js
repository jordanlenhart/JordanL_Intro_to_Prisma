import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.order.deleteMany();
  await prisma.client.deleteMany();
  await prisma.product.deleteMany();

  console.log("Cleared old data");

  // Create products
  const products = [];
  for (let i = 0; i < 5; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
      },
    });
    products.push(product);
    console.log(`🛒 Created product: ${product.name} ($${product.price})`);
  }

  // Create 3 clients, each with 1–2 orders, each order with 1–3 products
  for (let i = 0; i < 3; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    console.log(`👤 Created client: ${client.name}`);

    const numOrders = faker.number.int({ min: 1, max: 2 });

    for (let j = 0; j < numOrders; j++) {
      const orderProducts = faker.helpers.shuffle(products).slice(0, faker.number.int({ min: 1, max: 3 }));

      const order = await prisma.order.create({
        data: {
          date: faker.date.recent(),
          clientId: client.id,
          products: {
            connect: orderProducts.map((product) => ({ id: product.id })),
          },
        },
      });

      console.log(`Created order #${order.id} for ${client.name} with ${orderProducts.length} product(s)`);
    }
  }
}

main()
  .then(async () => {
    console.log("Seeding completed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
