"use client";

import { cn } from "@/lib/utils";
import * as NextImage from "next/image";
import { ElementRef, useEffect, useRef, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoBookmark, IoHeart } from "react-icons/io5";

interface PostCardProps {
  imageSrc: string;
}

export const PostCard = ({ imageSrc }: PostCardProps) => {
  const imageRef = useRef<ElementRef<"img">>(null);

  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const [intrinsicAR, setIntrinsicAR] = useState<any>(null);

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      if (image.naturalWidth / image.naturalHeight < 1) {
        setIntrinsicAR(`${image.naturalWidth}/${image.naturalHeight}`);
      } else setIntrinsicAR("1/1");
      setIsImgLoading(false);
    };

    image.src = imageSrc;
    console.log("eff");
  }, [imageSrc]);

  console.log("rendering");

  return (
    <div className="w-4/5 xs:w-full sm:w-3/5 max-w-[468px] flex flex-col items-center justify-center gap-y-4 border-b border-neutral-300 dark:border-neutral-600 pb-4 mb-5 text-sm">
      <div className="w-full flex items-center gap-x-4">
        <div className="relative size-8 aspect-square rounded-full bg-neutral-300 dark:bg-neutral-500 overflow-hidden">
          {/* <Image src="" alt="" className="size-full object-cover" fill sizes="auto" /> */}
        </div>
        <div className="flex items-center gap-x-1">
          <p className="font-semibold">LunarLieT</p>
          <GoDotFill className="size-2 opacity-75" />
          <p className="opacity-75">1 week</p>
        </div>
      </div>
      <div className="relative w-full flex items-center gap-x-4">
        <div
          className="flex-1 relative max-w-[468px] aspect-square rounded-sm overflow-hidden bg-neutral-900/10 dark:bg-neutral-900/25"
          style={{ aspectRatio: intrinsicAR }}
        >
          <NextImage.default
            ref={imageRef}
            src={imageSrc}
            alt=""
            className={cn("object-contain", isImgLoading && "hidden")}
            fill
            sizes="auto"
          />
        </div>
        <div className="hidden absolute left-full w-12 ml-2 sm:flex flex-col items-center justify-center gap-y-4">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <IoHeart className="size-7" />
            <span>2134</span>
          </div>
          <FaCommentDots className="size-6" />
          <IoBookmark className="size-7" />
        </div>
      </div>
      <div className="hidden sm:block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
        est nec magna semper varius eget sit amet ex. Donec sed auctor nibh.
        Nulla hendrerit iaculis nulla id aliquam.
      </div>
    </div>
  );
};
