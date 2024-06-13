"use client";

import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ElementRef, useEffect, useRef, useState } from "react";
import { CreatePostHeader } from "./create-post-header";
import setArrayImageData from "./set-array-image-data";

export const ImageUploadAdvancedCropper = () => {
  const {
    setState,
    setArrImgCroppedData,
    currentIndex,
    aspectRatio,
    arrImgPreCropData,
    setArrImgPreCropData,
  } = useCreateNewPost();

  const imgContainerRef = useRef<ElementRef<"div">>(null);
  const cropperRef = useRef<ElementRef<"div">>(null);

  const [containerSize, setContainerSize] = useState<[number, number]>();

  useEffect(() => {
    const containerTarget = imgContainerRef.current;
    if (containerTarget) {
      setContainerSize([
        containerTarget.offsetWidth,
        containerTarget.offsetHeight,
      ]);
    }
  }, []);

  if (!arrImgPreCropData) return;

  const intrinsicAR = arrImgPreCropData[currentIndex].intrinsicAR;

  const handleMoveCropper = () => {
    const containerTarget = imgContainerRef.current;
    const cropperTarget = cropperRef.current;
    if (!containerTarget || !cropperTarget) return;

    const onMove = (e: MouseEvent) => {
      if (cropperTarget.offsetTop + e.movementY < 0)
        cropperTarget.style.top = "0px";
      else if (
        cropperTarget.offsetTop + e.movementY >
        containerTarget.offsetHeight - cropperTarget.offsetHeight
      )
        cropperTarget.style.top =
          containerTarget.offsetHeight - cropperTarget.offsetHeight + "px";
      else
        cropperTarget.style.top = cropperTarget.offsetTop + e.movementY + "px";

      if (cropperTarget.offsetLeft + e.movementX < 0)
        cropperTarget.style.left = "0px";
      else if (
        cropperTarget.offsetLeft + e.movementX >
        containerTarget.offsetWidth - cropperTarget.offsetWidth
      )
        cropperTarget.style.left =
          containerTarget.offsetWidth - cropperTarget.offsetWidth + "px";
      else
        cropperTarget.style.left =
          cropperTarget.offsetLeft + e.movementX + "px";
    };

    const stopMove = () => {
      cropperTarget.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopMove);
    };

    cropperTarget.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopMove);
  };

  const handleUndo = () => {
    setState("ar");
  };
  const handleSaveChange = () => {
    const containerTarget = imgContainerRef.current;
    const cropperTarget = cropperRef.current;
    if (!containerTarget || !cropperTarget) return;
    setArrImgPreCropData((prev) => {
      prev![currentIndex].perCropTop =
        cropperTarget.offsetTop / containerTarget.offsetHeight;
      prev![currentIndex].perCropLeft =
        cropperTarget.offsetLeft / containerTarget.offsetWidth;
      const newArrImgCroppedData = setArrayImageData(prev!);
      setArrImgCroppedData(newArrImgCroppedData);
      return prev;
    });
    setState("ar");
  };

  return (
    <>
      <CreatePostHeader
        tilte="Advance cropping"
        leftBtn="Undo"
        handleLeftBtn={handleUndo}
        rightBtn="Done"
        handleRightBtn={handleSaveChange}
      />
      <div className="relative w-full h-[475px] flex items-center justify-center bg-neutral-950/40">
        <div
          ref={imgContainerRef}
          // Có tấm ảnh tanjiro bị tràn, cần xem xét
          className={cn("relative", intrinsicAR > 1.6 ? "w-full" : "h-full")}
          style={{ aspectRatio: intrinsicAR }}
        >
          <Image
            src={arrImgPreCropData[currentIndex].url}
            alt=""
            fill
            className="object-cover"
          />
          {containerSize && (
            <div
              ref={cropperRef}
              className="absolute border-2 border-sky-500 cursor-grab"
              style={{
                width:
                  arrImgPreCropData[currentIndex].perCropWidth *
                  containerSize[0],
                height:
                  arrImgPreCropData[currentIndex].perCropHeight *
                  containerSize[1],
                aspectRatio,
                top:
                  arrImgPreCropData[currentIndex].perCropTop * containerSize[1],
                left:
                  arrImgPreCropData[currentIndex].perCropLeft *
                  containerSize[0],
              }}
              onMouseDown={handleMoveCropper}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};
