import { PrismaClient } from '@prisma/client'
import { compareSync } from 'bcrypt'

const prisma = new PrismaClient()

// const saltRounds = 10
// const users = [
//   {
//     email: 'alice@prisma.io',
//     password: hashSync('alicePWD', saltRounds),
//   },
//   {
//     email: 'bob@prisma.io',
//     password: hashSync('bobPWD', saltRounds),
//   },
// ]

// A `main` function so that you can use async/await
async function main() {
  const bob = await prisma.user.findUnique({
    where: {
      email: 'bob@prisma.io'
    }
  })
  // use `console.dir` to print nested objects
  console.dir(bob, { depth: null })
  if (bob) {
    const passwordCheck = compareSync('bobPWD', bob.password)
    console.dir({ passwordCheck }, { depth: null })
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
