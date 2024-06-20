"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { CreatePostHeader } from "./create-post-header";
import { ButtonChangeImage } from "./btn-change-image";
import { uploadImages } from "@/action/upload-image-2";
import { Loading } from "../loading";
import { IoArrowBackOutline } from "react-icons/io5";

export const CreatePostInfo = () => {
  const {
    setState,
    arrCroppedImgData,
    setArrCroppedImgData,
    direction,
    aspectRatio,
  } = useCreateNewPost();

  const [croppedIndex, setCroppedIndex] = useState<number>(0);

  if (!arrCroppedImgData) return;

  const handleBack = () => {
    setState("ar");
    arrCroppedImgData.forEach((item) => {
      URL.revokeObjectURL(item.croppedURL);
    });
    setArrCroppedImgData(undefined);
  };

  const handleSharePost = async () => {
    return;
    // let datas: Uint8Array[] = [];
    // arrCroppedImgData.forEach((item) => {
    //   datas.push(item.bytes);
    // });
    // const res = await uploadImages(datas);
    // console.log(res);
  };

  return (
    <div className="w-[760px] flex flex-col rounded-md overflow-hidden animate-fade-in">
      <CreatePostHeader
        tilte="Creating a new post"
        LeftBtn={IoArrowBackOutline}
        handleLeftBtn={handleBack}
        rightBtn="Share"
        handleRightBtn={handleSharePost}
      />
      <div className="flex">
        <div className="relative size-[420px] flex items-center justify-center bg-neutral-950/40 overflow-hidden">
          <div
            className={cn(
              "relative transition-all",
              direction === "vertical" ? "h-full" : "w-full"
            )}
            style={{ aspectRatio: aspectRatio }}
          >
            {arrCroppedImgData[croppedIndex] ? (
              <Image
                src={arrCroppedImgData[croppedIndex].croppedURL}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <Loading />
            )}
          </div>
          {arrCroppedImgData.length > 1 && (
            <>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-1 p-1">
                {arrCroppedImgData.map((img, index) => (
                  <div
                    key={index}
                    className={cn(
                      "size-2 rounded-full",
                      index === croppedIndex ? "bg-sky-500" : "bg-sky-100/75"
                    )}
                  ></div>
                ))}
              </div>
            </>
          )}
          {/* <div className="absolute top-0 left-0 size-full bg-sky-500/50"></div> */}
          {croppedIndex > 0 && (
            <ButtonChangeImage
              action="prev"
              setCurrentIndex={setCroppedIndex}
            />
          )}
          {croppedIndex < arrCroppedImgData.length - 1 && (
            <ButtonChangeImage
              action="next"
              setCurrentIndex={setCroppedIndex}
            />
          )}
        </div>
        <div className="flex-1 bg-dark_2 p-4">
          <div>
            <h6>Title</h6>
            <input type="text" />
          </div>
          <div>
            <h6>Description</h6>
            <textarea />
          </div>
        </div>
      </div>
    </div>
  );
};
