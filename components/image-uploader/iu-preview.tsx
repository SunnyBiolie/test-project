"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ButtonChangeImage } from "./btn-change-image";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { ElementRef, useEffect, useRef } from "react";

export const ImageUploadPreview = () => {
  const {
    direction,
    aspectRatio,
    currentIndex,
    setCurrentIndex,
    arrImgPreCropData,
    arrImgCroppedData,
  } = useCreateNewPost();

  const cropContainerRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const target = cropContainerRef.current;
    if (target) {
      if (target.classList.contains("animate-fade-in")) {
        target.classList.remove("animate-fade-in");
        void target.offsetHeight;
      }

      target.classList.add("animate-fade-in");
      target.addEventListener(
        "animationend",
        () => {
          target.classList.remove("animate-fade-in");
        },
        { once: true }
      );
    }
  }, [currentIndex]);

  if (!arrImgPreCropData) return;
  const currImage = arrImgPreCropData[currentIndex];

  return (
    <div className="relative size-[475px] flex items-center justify-center bg-neutral-950/40 overflow-hidden">
      <div
        ref={cropContainerRef}
        className={cn(
          "relative transition-all flex flex-col items-center justify-center",
          direction === "vertical" ? "h-full" : "w-full"
        )}
        style={{ aspectRatio: aspectRatio }}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            aspectRatio < arrImgPreCropData[currentIndex].intrinsicAR
              ? "h-full"
              : "w-full"
          )}
          style={{ aspectRatio: arrImgPreCropData[currentIndex].intrinsicAR }}
        >
          <Image
            src={currImage?.url || "/logo.png"}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* <div className="absolute size-full top-0 left-0 border-2 border-sky-500"></div> */}
      </div>
      {arrImgPreCropData.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-1 p-1">
            {arrImgPreCropData.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "size-2 rounded-full",
                  index === currentIndex ? "bg-sky-400" : "bg-neutral-400"
                )}
              ></div>
            ))}
          </div>
        </>
      )}
      {/* <div className="absolute top-0 left-0 size-full bg-sky-500/50"></div> */}
      {currentIndex > 0 && (
        <ButtonChangeImage action="prev" setCurrentIndex={setCurrentIndex} />
      )}
      {currentIndex < arrImgPreCropData.length - 1 && (
        <ButtonChangeImage action="next" setCurrentIndex={setCurrentIndex} />
      )}
    </div>
  );
};
