"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { StateHeader } from "./state-header";
import { BiUndo } from "react-icons/bi";

export const CreatePostAdvancedCrop = () => {
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

  useEffect(() => {
    const containerTarget = imgContainerRef.current;
    if (containerTarget) {
      const imgWidth = containerTarget.getBoundingClientRect().width;
      const imgHeight = containerTarget.getBoundingClientRect().height;
      setContainerSize([imgWidth, imgHeight]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!arrImgPreCropData) return;

  const currOriImgData = arrImgPreCropData[currentIndex];

  const handleMoveCropper = () => {
    const cropperTarget = cropperRef.current;
    const gridTarget = gridRef.current;

    const topDivTarget = topDivRef.current;
    const bottomDivTarget = bottomDivRef.current;
    const leftDivTarget = leftDivRef.current;
    const rightDivTarget = rightDivRef.current;

    if (
      !containerSize ||
      !cropperTarget ||
      !gridTarget ||
      !topDivTarget ||
      !bottomDivTarget ||
      !leftDivTarget ||
      !rightDivTarget
    )
      return;

    cropperTarget.style.cursor = "grabbing";

    const onMove = (e: MouseEvent) => {
      gridTarget.style.display = "grid";

      const imgWidth = containerSize[0];
      const imgHeight = containerSize[1];

      const cropperWidth = cropperTarget.offsetWidth;
      const cropperHeight = cropperTarget.getBoundingClientRect().height;
      const cropperTop = cropperTarget.offsetTop;
      const cropperLeft = cropperTarget.offsetLeft;

      if (cropperTop + e.movementY <= 0) cropperTarget.style.top = "0px";
      else if (cropperTop + e.movementY >= imgHeight - cropperHeight)
        cropperTarget.style.top = imgHeight - cropperHeight + "px";
      else cropperTarget.style.top = cropperTop + e.movementY + "px";

      if (cropperLeft + e.movementX <= 0) cropperTarget.style.left = "0px";
      else if (cropperLeft + e.movementX >= imgWidth - cropperWidth) {
        cropperTarget.style.left = imgWidth - cropperWidth + "px";
        rightDivTarget.style.width = "0px";
      } else cropperTarget.style.left = cropperLeft + e.movementX + "px";

      topDivTarget.style.height = cropperTarget.offsetTop + "px";
      topDivTarget.style.left = cropperTarget.offsetLeft + "px";
      bottomDivTarget.style.height =
        imgHeight - cropperHeight - cropperTarget.offsetTop + "px";
      bottomDivTarget.style.left = cropperTarget.offsetLeft + "px";
      leftDivTarget.style.width = cropperTarget.offsetLeft + "px";
      rightDivTarget.style.width =
        imgWidth - cropperWidth - cropperTarget.offsetLeft + "px";
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

  const handleResizeCropper = (resizeDirection: "left" | "right") => {
    const cropperTarget = cropperRef.current;

    const topDivTarget = topDivRef.current;
    const bottomDivTarget = bottomDivRef.current;
    const leftDivTarget = leftDivRef.current;
    const rightDivTarget = rightDivRef.current;

    if (
      !containerSize ||
      !cropperTarget ||
      !topDivTarget ||
      !bottomDivTarget ||
      !leftDivTarget ||
      !rightDivTarget
    )
      return;

    const onMove = (e: MouseEvent) => {
      const imgWidth = containerSize[0];
      const imgHeight = containerSize[1];

      const cropperWidth = cropperTarget.offsetWidth;
      const cropperHeight = cropperTarget.getBoundingClientRect().height;
      const cropperTop = cropperTarget.offsetTop;
      const cropperLeft = cropperTarget.offsetLeft;

      if (resizeDirection === "left") {
        // Aspect Ratio ảnh lớn hơn --> Mặc định: cropperHeight === imgHeight
        if (currOriImgData.intrinsicAR > aspectRatio) {
          // cropperHeight nhỏ nhất bằng 1/2 imgHeight
          if (cropperHeight - e.movementX * aspectRatio <= imgHeight / 2) {
            cropperTarget.style.width = (imgHeight / 2) * aspectRatio + "px";

            // cropperHeight lớn nhất bằng imgHeight
          } else if (cropperHeight - e.movementX * aspectRatio >= imgHeight) {
            cropperTarget.style.width = imgHeight * aspectRatio + "px";

            // Cropper nằm sát dưới khi mở rộng
            if (
              cropperTop + cropperHeight - e.movementX * aspectRatio >=
              imgHeight
            ) {
              // cropperTarget.style.top = "0px";
            }
          } else {
            cropperTarget.style.width = cropperWidth - e.movementX + "px";

            // Cropper nằm sát trái và đang rộng
            if (cropperTarget.offsetLeft <= 0 && e.movementX <= 0) {
              cropperTarget.style.left = "0px";
            } else {
              cropperTarget.style.left = cropperLeft + e.movementX + "px";
            }

            // Cropper nằm sát dưới khi mở rộng
            if (
              cropperTop + cropperHeight - e.movementX * aspectRatio >=
              imgHeight
            ) {
              cropperTarget.style.top =
                cropperTop + e.movementX / aspectRatio + "px";
            }
          }

          // Aspect Ratio ảnh nhỏ hơn --> Mặc định: cropperWidth === imgWidth
        } else {
          // cropperWidth nhỏ nhất bằng 1/2 imgWidth
          if (cropperWidth - e.movementX <= imgWidth / 2) {
            cropperTarget.style.width = imgWidth / 2 + "px";

            // cropperWidth lớn nhất bằng imgWidth
          } else if (cropperWidth - e.movementX >= imgWidth) {
            cropperTarget.style.width = imgWidth + "px";
            cropperTarget.style.left = "0px";
            rightDivTarget.style.width = "0px";

            // Cropper nằm sát dưới khi mở rộng
            if (
              cropperTop + cropperHeight - e.movementX * aspectRatio >=
              imgHeight
            ) {
              cropperTarget.style.top =
                imgHeight - cropperTarget.offsetHeight + "px";
            }

            // cropperWidth ở khoảng giữa 1/2 và 1 của imgWidth
          } else {
            cropperTarget.style.width = cropperWidth - e.movementX + "px";

            // Cropper nằm sát trái và đang mở rộng
            if (cropperTarget.offsetLeft <= 0 && e.movementX <= 0) {
              cropperTarget.style.left = "0px";
            } else {
              cropperTarget.style.left = cropperLeft + e.movementX + "px";
            }

            // Cropper nằm sát dưới khi mở rộng
            if (
              cropperTop + cropperHeight - e.movementX * aspectRatio >=
              imgHeight
            ) {
              cropperTarget.style.top =
                cropperTop + e.movementX / aspectRatio + "px";
            }
          }
        }
      } else if (resizeDirection === "right") {
        // Aspect Ratio ảnh lớn hơn --> Mặc định: cropperHeight === imgHeight
        if (currOriImgData.intrinsicAR > aspectRatio) {
          // cropperHeight nhỏ nhất bằng 1/2 imgHeight
          if (cropperHeight + e.movementX * aspectRatio <= imgHeight / 2) {
            cropperTarget.style.width = (imgHeight / 2) * aspectRatio + "px";

            // cropperHeight lớn nhất bằng imgHeight
          } else if (cropperHeight + e.movementX * aspectRatio >= imgHeight) {
            cropperTarget.style.width = imgHeight * aspectRatio + "px";

            // imgHeight/2 < cropperHeight < imgHeight
          } else {
            cropperTarget.style.width = cropperWidth + e.movementX + "px";
          }
          // Aspect Ratio ảnh nhỏ hơn --> Mặc định: cropperWidth === imgWidth
        } else {
          if (cropperWidth + e.movementX <= imgWidth / 2) {
            cropperTarget.style.width = imgWidth / 2 + "px";
          } else if (cropperWidth + e.movementX >= imgWidth) {
            cropperTarget.style.width = imgWidth + "px";
          } else {
            cropperTarget.style.width = cropperWidth + e.movementX + "px";
          }
        }
      }

      if (cropperTarget.offsetLeft <= 0) {
        cropperTarget.style.left = "0px";
      }
      // Stick right
      if (cropperTarget.offsetLeft + cropperTarget.offsetWidth >= imgWidth) {
        cropperTarget.style.left = imgWidth - cropperTarget.offsetWidth + "px";
        rightDivTarget.style.width = "0px";
      }
      if (cropperTarget.offsetTop <= 0) {
        cropperTarget.style.top = "0px";
      }
      if (cropperTarget.offsetTop + cropperTarget.offsetHeight >= imgHeight) {
        cropperTarget.style.top = imgHeight - cropperTarget.offsetHeight + "px";
      }

      topDivTarget.style.width = cropperTarget.offsetWidth + "px";
      topDivTarget.style.height = cropperTarget.offsetTop + "px";
      topDivTarget.style.left = cropperTarget.offsetLeft + "px";

      bottomDivTarget.style.width = cropperTarget.offsetWidth + "px";
      bottomDivTarget.style.height =
        imgHeight - cropperTarget.offsetTop - cropperTarget.offsetHeight + "px";
      bottomDivTarget.style.left = cropperTarget.offsetLeft + "px";

      leftDivTarget.style.width = cropperTarget.offsetLeft + "px";

      rightDivTarget.style.width =
        imgWidth - cropperTarget.offsetWidth - cropperTarget.offsetLeft + "px";
      // console.log(
      //   "Trc gan",
      //   cropperTarget.offsetWidth,
      //   cropperTarget.offsetLeft,
      //   rightDivTarget.style.width
      // );
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
    const cropperTarget = cropperRef.current;
    if (containerSize && cropperTarget) {
      setState("ar");
      setArrImgPreCropData((prev) => {
        if (prev) {
          prev![currentIndex].perCropPos = [
            cropperTarget.offsetTop / containerSize[1],
            cropperTarget.offsetLeft / containerSize[0],
          ];
          prev![currentIndex].perCropSize = [
            cropperTarget.offsetWidth / containerSize[0],
            cropperTarget.offsetHeight / containerSize[1],
          ];
        }
        return prev;
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <StateHeader
        tilte="Crop in more detail"
        LeftBtn={BiUndo}
        abbrTitle="Undo"
        handleLeftBtn={handleUndo}
        rightBtn="Done"
        handleRightBtn={handleSaveChange}
      />
      <div className="relative w-[760px] h-[475px] flex items-center justify-center bg-neutral-950/50 px-1">
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
                  className="absolute top-0 bg-neutral-950/75"
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
                    className="absolute top-0 -left-[1px] bottom-0 cursor-ew-resize"
                    onMouseDown={(e) => {
                      handleResizeCropper("left");
                      e.stopPropagation();
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 min-h-12 max-h-24 h-1/4 bg-sky-100 rounded-full"></div>
                  </div>
                  <div
                    className="absolute top-0 -right-[1px] bottom-0 cursor-ew-resize"
                    onMouseDown={(e) => {
                      handleResizeCropper("right");
                      e.stopPropagation();
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 min-h-12 max-h-24 h-1/4 bg-sky-100 rounded-md"></div>
                  </div>
                </div>
                <div
                  ref={bottomDivRef}
                  className="absolute bottom-0 bg-neutral-950/75"
                  style={{
                    width: currOriImgData.perCropSize[0] * containerSize[0],
                    height:
                      containerSize[1] -
                      currOriImgData.perCropPos[0] * containerSize[1] -
                      currOriImgData.perCropSize[1] * containerSize[1],
                    left: currOriImgData.perCropPos[1] * containerSize[0],
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
