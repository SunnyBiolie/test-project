import {
  AspectRatio,
  Direction,
  ImgCroppedData,
  ImgPreCropData,
} from "@/types/create-post-type";
import { Dispatch, SetStateAction } from "react";

export default function createArrayCroppedImage(
  arrImgPreCrop: ImgPreCropData[],
  setArrCroppedImgData: Dispatch<SetStateAction<ImgCroppedData[] | undefined>>,
  direction?: Direction,
  aspectRatio?: AspectRatio
) {
  let result: ImgCroppedData[] = [];

  arrImgPreCrop.forEach((item, index) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let cropHeight = 0;
      let cropWidth = 0;
      let x = 0;
      let y = 0;
      cropHeight = img.naturalHeight * item.perCropSize[1];
      cropWidth = img.naturalWidth * item.perCropSize[0];
      // if (direction === "vertical") {
      //   cropHeight = img.naturalHeight;
      //   switch (aspectRatio) {
      //     case 0.5625:
      //       cropWidth = (cropHeight / 16) * 9;
      //       break;
      //     case 0.6666666666666667:
      //       cropWidth = (cropHeight / 3) * 2;
      //       break;
      //     case 0.75:
      //       cropWidth = (cropHeight / 4) * 3;
      //       break;
      //     case 0.8:
      //       cropWidth = (cropHeight / 5) * 4;
      //       break;
      //     case 1:
      //       if (img.naturalWidth > cropHeight) {
      //         cropWidth = cropHeight;
      //       } else {
      //         cropWidth = img.naturalWidth;
      //         cropHeight = cropWidth;
      //       }
      //       break;
      //     default:
      //       console.error("Invalid aspect ratio in vertical direction");
      //       return;
      //   }
      // } else {
      //   cropWidth = img.naturalWidth;
      //   switch (aspectRatio) {
      //     case 1.7777777777777778:
      //       cropHeight = (cropWidth / 16) * 9;
      //       break;
      //     case 1.5:
      //       cropHeight = (cropWidth / 3) * 2;
      //       break;
      //     case 1.3333333333333333:
      //       cropHeight = (cropWidth / 4) * 3;
      //       break;
      //     case 1.25:
      //       cropHeight = (cropWidth / 5) * 4;
      //       break;
      //     case 1:
      //       if (img.naturalHeight > cropWidth) {
      //         cropHeight = cropWidth;
      //       } else {
      //         cropHeight = img.naturalHeight;
      //         cropHeight = cropHeight;
      //       }
      //       break;
      //     default:
      //       console.error("Invalid aspect ratio in horizontal direction");
      //       return;
      //   }
      // }
      canvas.height = cropHeight;
      canvas.width = cropWidth;

      x = img.naturalWidth * item.perCropPos[1];
      y = img.naturalHeight * item.perCropPos[0];
      // x = img.naturalWidth / 2 - cropWidth / 2;
      // y = img.naturalHeight / 2 - cropHeight / 2;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        img,
        x,
        y,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
      // Chọn type là jpg/jpge và chất lượng nén là 80% để giảm kích thước
      const dataURL = canvas.toDataURL("image/jpeg", 0.8);
      const base64Data = dataURL.split(",")[1];
      const binaryString = atob(base64Data);
      const length = binaryString.length;
      // Chuyển dữ liệu từ base64 sang Uint8Array --> giảm kích thước dữ liệu (?)
      const bytes = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const croppedURL = URL.createObjectURL(
        new Blob([bytes.buffer], { type: "image/jpeg" })
      );

      result[index] = { bytes, croppedURL };
      if (result.length === arrImgPreCrop.length) {
        setArrCroppedImgData(result);
      }
    };
    img.src = item.originURL;
  });
}

// export default async function setArrayImageData(
//   arrImgPreCrop: ImgPreCropData[],
//   direction?: Direction,
//   aspectRatio?: AspectRatio
// ) {
//   let result: ImgCroppedData[] = [];

//   arrImgPreCrop.forEach(async (item) => {
//     const img = (await loadImage(item.originURL)) as HTMLImageElement;
//     const canvas = document.createElement("canvas");
//     let cropHeight = 0;
//     let cropWidth = 0;
//     let x = 0;
//     let y = 0;
//     cropHeight = img.naturalHeight * item.perCropSize[1];
//     cropWidth = img.naturalWidth * item.perCropSize[0];

//     canvas.height = cropHeight;
//     canvas.width = cropWidth;

//     x = img.naturalWidth * item.perCropPos[1];
//     y = img.naturalHeight * item.perCropPos[0];

//     const ctx = canvas.getContext("2d");
//     ctx?.drawImage(
//       img,
//       x,
//       y,
//       cropWidth,
//       cropHeight,
//       0,
//       0,
//       cropWidth,
//       cropHeight
//     );
//     // Chọn type là jpg/jpge và chất lượng nén là 80% để giảm kích thước
//     const dataURL = canvas.toDataURL("image/jpeg", 0.8);
//     const base64Data = dataURL.split(",")[1];
//     const binaryString = atob(base64Data);
//     const length = binaryString.length;
//     // Chuyển dữ liệu từ base64 sang Uint8Array --> giảm kích thước dữ liệu (?)
//     const bytes = new Uint8Array(length);
//     for (let i = 0; i < length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }

//     const croppedURL = URL.createObjectURL(
//       new Blob([bytes.buffer], { type: "image/jpeg}" })
//     );

//     result.push({ bytes, croppedURL });
//   });

//   return result;
// }

// const loadImage = (url: string) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => {
//       resolve(img);
//     };
//     img.onerror = (e) => {
//       reject(e);
//     };
//     img.src = url;
//   });
// };
