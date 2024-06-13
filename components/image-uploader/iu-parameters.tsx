"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { uploadImage } from "@/action/upload-image-2";
import { ImageQueue } from "./image-queue";
import { AspectRatio } from "@/types/create-post-type";

const vertical: AspectRatio[] = [0.5625, 0.6666666666666667, 0.75, 0.8, 1];
const verticalDisplay = ["9:16", "2:3", "3:4", "4:5", "1:1"];
const horizontal: AspectRatio[] = [
  1.7777777777777778, 1.5, 1.3333333333333333, 1.25, 1,
];
const horizontalDisplay = ["16:9", "3:2", "4:3", "5:4", "1:1"];

export const ImageUploadParameters = () => {
  const {
    setState,
    direction,
    setDirection,
    aspectRatio,
    setAspectRatio,

    arrImgPreCropData,
  } = useCreateNewPost();

  const [arIndex, setArIndex] = useState<number>(0);

  if (!arrImgPreCropData) return;

  const handleSelectDirection = (
    direction: "vertical" | "horizontal",
    ar: AspectRatio
  ) => {
    setDirection(direction);
    setAspectRatio(ar);
  };

  const handleSelectAR = (item: AspectRatio, index: number) => {
    setAspectRatio(item);
    setArIndex(index);
  };

  return (
    <div className="size-full p-4 text-sm font-medium space-y-3">
      <div className="space-y-1.5">
        <p>Direction</p>
        <div className="w-fit bg-dark_3 p-1 rounded-md flex items-center gap-x-1">
          <div
            className={cn(
              "py-2 px-3 rounded-md cursor-pointer",
              direction === "vertical" && "bg-light_3"
            )}
            onClick={() => handleSelectDirection("vertical", vertical[arIndex])}
          >
            <LuRectangleVertical className="size-5" />
          </div>
          <div
            className={cn(
              "py-2 px-3 rounded-md cursor-pointer",
              direction === "horizontal" && "bg-light_3"
            )}
            onClick={() =>
              handleSelectDirection("horizontal", horizontal[arIndex])
            }
          >
            <LuRectangleHorizontal className="size-5" />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <p>Aspect Ratio</p>
        <div className="w-fit bg-dark_3 p-1 rounded-md flex items-center gap-x-1">
          {direction === "vertical"
            ? vertical.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "py-2 px-3 rounded-md cursor-pointer",
                    item === aspectRatio && "bg-light_3"
                  )}
                  onClick={() => handleSelectAR(item, index)}
                >
                  {verticalDisplay[index]}
                </div>
              ))
            : horizontal.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "py-2 px-3 rounded-md cursor-pointer",
                    item === aspectRatio && "bg-light_3"
                  )}
                  onClick={() => handleSelectAR(item, index)}
                >
                  {horizontalDisplay[index]}
                </div>
              ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <p>Photos</p>
        <ImageQueue />
      </div>
      <button
        className="p-2 rounded-sm bg-sky-700"
        onClick={() => setState("cr")}
      >
        Advanced Cropping
      </button>
    </div>
  );
};
