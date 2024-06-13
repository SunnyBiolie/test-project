import { AspectRatio } from "@/types/create-post-type";

export const calPercSizeAndPos = (
  intrinsicAR: number,
  aspectRatio: AspectRatio
) => {
  const perCropHeight =
    intrinsicAR >= aspectRatio ? 1 : 1 / (aspectRatio / intrinsicAR);
  const perCropWidth =
    intrinsicAR <= aspectRatio ? 1 : aspectRatio / intrinsicAR;
  const perCropTop = perCropHeight === 1 ? 0 : 0.5 - perCropHeight / 2;
  const perCropLeft = perCropWidth === 1 ? 0 : 0.5 - perCropWidth / 2;

  return { perCropHeight, perCropWidth, perCropTop, perCropLeft };
};
