"use server";

import prisma from "@/lib/prisma";
import ImageKit from "imagekit";

export const uploadImages = async (datas: Uint8Array[]) => {
  let imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
  });

  let result: any[] = [];

  datas.forEach((imgData: Uint8Array) => {
    const buffer = Buffer.from(imgData);
    imageKit.upload(
      {
        file: buffer,
        fileName: "danh danh",
        folder: "photograms",
      },
      async function (err, res) {
        if (err) console.log(err);
        else {
          console.log(res);
          result.push(res);
          if (res) {
            const post = await prisma.post.create({
              data: {
                imageUrl: res.url,
                authorId: "clxiohm7c000013pyw6zu4tx9",
              },
            });
          }
          return result;
        }
      }
    );
  });
};
