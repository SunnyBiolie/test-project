"use client";

import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ElementRef, useEffect, useRef, useState } from "react";
import { CreatePostHeader } from "./create-post-header";
import { BiUndo } from "react-icons/bi";
import { TbBorderCornerSquare } from "react-icons/tb";

export const ImageUploadAdvancedCropper = () => {
  const {
    setState,
    currentIndex,
    aspectRatio,
    arrImgPreCropData,
    setArrImgPreCropData,
  } = useCreateNewPost();

  const imgContainerRef = useRef<ElementRef<"div">>(null);
  const cropperRef = useRef<ElementRef<"div">>(null);
  const gridRef = useRef<ElementRef<"div">>(null);

  const topDivRef = useRef<ElementRef<"div">>(null);
  const bottomDivRef = useRef<ElementRef<"div">>(null);
  const leftDivRef = useRef<ElementRef<"div">>(null);
  const rightDivRef = useRef<ElementRef<"div">>(null);

  const topLeftCornerRef = useRef<ElementRef<"div">>(null);

  const [containerSize, setContainerSize] = useState<[number, number]>();
  const [cropperPosition, setCropperPosition] =
    useState<[number, number, number, number]>();

  useEffect(() => {
    const containerTarget = imgContainerRef.current;
    if (arrImgPreCropData && containerTarget) {
      const currOriImgData = arrImgPreCropData[currentIndex];

      const imgWidth = containerTarget.offsetWidth;
      const imgHeight = containerTarget.offsetHeight;
      setContainerSize([
        containerTarget.offsetWidth,
        containerTarget.offsetHeight,
      ]);

      const top = imgHeight * currOriImgData.perCropPos[0];
      const left = imgWidth * currOriImgData.perCropPos[1];
      const right = imgWidth - imgWidth * currOriImgData.perCropSize[0] - left;
      const bottom =
        imgHeight - imgHeight * currOriImgData.perCropSize[1] - top;
      setCropperPosition([top, right, bottom, left]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!arrImgPreCropData) return;

  const currOriImgData = arrImgPreCropData[currentIndex];

  const handleMoveCropper = () => {
    const containerTarget = imgContainerRef.current;
    const cropperTarget = cropperRef.current;
    const gridTarget = gridRef.current;

    const topTarget = topDivRef.current;
    const bottomTarget = bottomDivRef.current;
    const leftTarget = leftDivRef.current;
    const rightTarget = rightDivRef.current;
    if (
      !containerTarget ||
      !cropperTarget ||
      !gridTarget ||
      !topTarget ||
      !bottomTarget ||
      !leftTarget ||
      !rightTarget
    )
      return;

    cropperTarget.style.cursor = "grabbing";

    const onMove = (e: MouseEvent) => {
      gridTarget.style.display = "grid";

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

      topTarget.style.height = cropperTarget.offsetTop + "px";
      bottomTarget.style.height =
        containerSize![1] -
        cropperTarget.offsetHeight -
        cropperTarget.offsetTop +
        "px";
      leftTarget.style.width = cropperTarget.offsetLeft + "px";
      rightTarget.style.width =
        containerSize![0] -
        cropperTarget.offsetWidth -
        cropperTarget.offsetLeft +
        "px";
    };

    const stopMove = () => {
      gridTarget.style.display = "none";
      cropperTarget.style.cursor = "grab";

      cropperTarget.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopMove);
    };

    cropperTarget.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopMove);
  };

  const handleResizeCropper = () => {
    const cropperTarget = cropperRef.current;
    const tlcTarget = topLeftCornerRef.current;
    if (!cropperTarget || !tlcTarget) return;

    const onMove = (e: MouseEvent) => {
      e.stopPropagation();
      cropperTarget.style.width =
        cropperTarget.offsetWidth - e.movementX + "px";
    };

    const stopMove = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopMove);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopMove);
  };

  const handleUndo = () => {
    setState("ar");
  };

  const handleSaveChange = () => {
    const containerTarget = imgContainerRef.current;
    const cropperTarget = cropperRef.current;
    if (containerTarget && cropperTarget) {
      setState("ar");
      setArrImgPreCropData((prev) => {
        if (prev) {
          prev![currentIndex].perCropPos = [
            cropperTarget.offsetTop / containerTarget.offsetHeight,
            cropperTarget.offsetLeft / containerTarget.offsetWidth,
          ];
        }
        return prev;
      });
    }
  };

  return (
    <div className="w-[760px] flex flex-col rounded-md overflow-hidden animate-fade-in">
      <CreatePostHeader
        tilte="Crop"
        LeftBtn={BiUndo}
        handleLeftBtn={handleUndo}
        rightBtn="Done"
        handleRightBtn={handleSaveChange}
      />
      <div className="relative w-full h-[475px] flex items-center justify-center bg-neutral-950/40">
        <div
          ref={imgContainerRef}
          className={cn(
            "relative",
            currOriImgData.intrinsicAR > 1.6 ? "w-full" : "h-full"
          )}
          style={{ aspectRatio: currOriImgData.intrinsicAR }}
        >
          <Image
            src={currOriImgData.originURL}
            alt=""
            fill
            className="object-cover"
          />
          {containerSize && (
            <div className="absolute top-0 left-0 size-full flex animate-fade-in">
              <div
                ref={leftDivRef}
                className="absolute top-0 left-0 h-full bg-neutral-950/75"
                style={{
                  width: currOriImgData.perCropPos[1] * containerSize[0],
                }}
              ></div>
              <div className="flex flex-col">
                <div
                  ref={topDivRef}
                  className="absolute top-0 left-0 w-full bg-neutral-950/75"
                  style={{
                    width: currOriImgData.perCropSize[0] * containerSize[0],
                    height: currOriImgData.perCropPos[0] * containerSize[1],
                    left: currOriImgData.perCropPos[1] * containerSize[0],
                  }}
                ></div>
                <div
                  ref={cropperRef}
                  className="absolute cursor-grab border-2 border-sky-100/75 z-10"
                  style={{
                    width: currOriImgData.perCropSize[0] * containerSize[0],
                    // height: currOriImgData.perCropSize[1] * containerSize[1],
                    aspectRatio,
                    top: currOriImgData.perCropPos[0] * containerSize[1],
                    left: currOriImgData.perCropPos[1] * containerSize[0],
                  }}
                  onMouseDown={handleMoveCropper}
                >
                  <div ref={gridRef} className="size-full hidden grid-cols-3">
                    <div className="border-r border-b border-sky-100/50"></div>
                    <div className="border border-t-0 border-sky-100/50"></div>
                    <div className="border-l border-b border-sky-100/50"></div>
                    <div className="border border-l-0 border-sky-100/50"></div>
                    <div className="border border-sky-100/50"></div>
                    <div className="border border-r-0 border-sky-100/50"></div>
                    <div className="border-t border-r border-sky-100/50"></div>
                    <div className="border border-b-0 border-sky-100/50"></div>
                    <div className="border-t border-l border-sky-100/50"></div>
                  </div>
                  <div
                    ref={topLeftCornerRef}
                    className="absolute top-0 left-0 cursor-nwse-resize"
                    onMouseDown={handleResizeCropper}
                  >
                    <TbBorderCornerSquare className="size-5" />
                  </div>
                </div>
                <div
                  ref={bottomDivRef}
                  className="absolute bottom-0 left-0 w-full bg-neutral-950/75"
                  style={{
                    height:
                      containerSize[1] -
                      currOriImgData.perCropPos[0] * containerSize[1] -
                      currOriImgData.perCropSize[1] * containerSize[1],
                  }}
                ></div>
              </div>
              <div
                ref={rightDivRef}
                className="absolute top-0 right-0 h-full bg-neutral-950/75"
                style={{
                  width:
                    containerSize[0] -
                    currOriImgData.perCropPos[1] * containerSize[0] -
                    currOriImgData.perCropSize[0] * containerSize[0],
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
