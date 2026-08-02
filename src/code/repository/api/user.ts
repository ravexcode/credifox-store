import prisma from "@/lib/prisma";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      tag: true,
      name: true,
      uploaded: true,
      created_at: true,
    }
  });

  return user;
}
