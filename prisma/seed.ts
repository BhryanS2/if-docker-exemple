import { prisma } from '../src/lib/prisma'

// model Task {
//   id          String  @id @default(cuid())
//   title       String
//   description String?
//   status      String
// }

async function seed() {
  await prisma.Task.create({
    data: {
      title: 'Task 1',
      description: 'This is the first task',
      status: 'OPEN',
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})