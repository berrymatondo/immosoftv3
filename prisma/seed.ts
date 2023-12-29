import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "test@gmail.com",
    },
    update: {},
    create: {
      email: "test@gmail.com",
      password: await bcrypt.hash("test", 12),
      name: "test Admin User",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  //  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
