"use server";

import ImageKit from "imagekit";

export const uploadImage = async (formData: FormData) => {
  let imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
  });

  const image = formData.get("image") as File;

  const buffer = Buffer.from(await image.arrayBuffer());

  imageKit.upload(
    {
      file: buffer,
      fileName: "file.jpg",
      folder: "danhdanh",
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
};
