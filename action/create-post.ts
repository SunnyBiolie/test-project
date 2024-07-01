"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import ImageKit from "imagekit";

type ReturnValue = {
  type: "success" | "error";
  message: string;
};

export const createPost = async (
  listImagesData: Uint8Array[],
  caption: string | undefined,
  hideLikeCounts: boolean,
  turnOffCmt: boolean
): Promise<ReturnValue> => {
  // const user = await currentUser();

  // if (user) {
  // const imageKit = new ImageKit({
  //   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  //   privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  //   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
  // });

  // // Tạo bài viết
  // const post = await prisma.post.create({
  //   data: {
  //     authorId: user.id,
  //     caption,
  //     hideLikeCounts,
  //     turnOffCmt,
  //   },
  // });

  // listImagesData.forEach(async (bytes: Uint8Array) => {
  //   const buffer = Buffer.from(bytes);
  //   imageKit.upload(
  //     {
  //       file: buffer,
  //       fileName: `${user.lastName}`,
  //       folder: "photograms",
  //     },
  //     async function (err, res) {
  //       if (err) return err;
  //       else if (res) {
  //         await prisma.image.create({
  //           data: {
  //             id: res.fileId,
  //             url: res.url,
  //             postId: post.id,
  //           },
  //         });
  //       }
  //     }
  //   );
  // });

  //   return {
  //     type: "success",
  //     message: "Created successfully!",
  //   };
  // } else {
  //   return {
  //     type: "error",
  //     message: "Cannot find the user!",
  //   };
  // }

  await new Promise((r) => {
    setTimeout(r, 2000);
  });

  return {
    type: "error",
    message: "Return Value",
  };
};
