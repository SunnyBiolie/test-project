"use server";

import ImageKit from "imagekit";

export const uploadImage = async (datas: Uint8Array[]) => {
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
        fileName: "file.jpeg",
        folder: "test",
      },
      function (err, res) {
        if (err) console.log(err);
        else result.push(res);
      }
    );
  });

  return result;
};
