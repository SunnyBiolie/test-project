"use client";

import { cn } from "@/lib/utils";
import { ButtonChangeImage } from "./btn-change-image";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { Loading } from "../loading";

export const CropPreviews = () => {
  const {
    arrImgPreCropData,
    currentIndex,
    setCurrentIndex,
    direction,
    aspectRatio,
  } = useCreateNewPost();

  if (!arrImgPreCropData) return;

  const currImgPreCropData = arrImgPreCropData[currentIndex];

  return (
    <div className="relative size-[475px] shrink-0 flex items-center justify-center bg-slate-950/50 overflow-hidden">
      <div
        className={cn(
          "relative transition-all duration-300 ease-out",
          direction === "vertical" ? "h-full" : "w-full"
        )}
        style={{ aspectRatio: aspectRatio }}
      >
        {currImgPreCropData ? (
          <div
            style={{
              backgroundImage: `url(${currImgPreCropData.originURL})`,
              backgroundPositionX: `${
                (currImgPreCropData.perCropPos[1] /
                  (1 - currImgPreCropData.perCropSize[0])) *
                100
              }%`,
              backgroundPositionY: `${
                (currImgPreCropData.perCropPos[0] /
                  (1 - currImgPreCropData.perCropSize[1])) *
                100
              }%`,
              backgroundSize: `${
                currImgPreCropData.perCropSize[0] !== 1 &&
                currImgPreCropData.perCropSize[1] !== 1
                  ? (1 / currImgPreCropData.perCropSize[0]) * 100 + "%"
                  : "cover"
              }`,
            }}
            className="size-full bg-no-repeat"
          />
        ) : (
          <Loading />
        )}
      </div>
      {arrImgPreCropData.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-1 p-1">
            {arrImgPreCropData.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "size-2 rounded-full",
                  index === currentIndex ? "bg-sky-500" : "bg-sky-100/75"
                )}
              ></div>
            ))}
          </div>
        </>
      )}
      {currentIndex > 0 && (
        <ButtonChangeImage action="prev" setCurrentIndex={setCurrentIndex} />
      )}
      {currentIndex < arrImgPreCropData.length - 1 && (
        <ButtonChangeImage action="next" setCurrentIndex={setCurrentIndex} />
      )}
    </div>
  );
};
