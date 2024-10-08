import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Upsert for product 1
  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Coca-cola',
      price: 5,
      stock: 10,
    }
  })

  // Upsert for product 2
  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Pepsi',
      price: 4.5,
      stock: 20,
    }
  })

  // Upsert for product 3
  const product3 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Sprite',
      price: 4,
      stock: 15,
    }
  })

  // Upsert for product 4
  const product4 = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Fanta',
      price: 3.5,
      stock: 12,
    }
  })

  // Output result (optional)
  console.log({ product1, product2, product3, product4 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
