"use server";

import prisma from "@/lib/prisma";

export const createUser = async () => {
  const res = await prisma.user.create({
    data: {
      name: "Lunar",
    },
  });
  return res;
};

export const createCategory = async () => {
  const category = await prisma.category.create({});
  return category;
};

export const createPost = async () => {
  const post = await prisma.post.create({
    data: {
      imageUrl:
        "https://i.pinimg.com/736x/7c/bd/7c/7cbd7c8685799a73ec07fc54b061abc3.jpg",
      authorId: "clxiohm7c000013pyw6zu4tx9",
      categories: {
        connect: {
          id: 1,
        },
      },
    },
  });
  return post;
};
