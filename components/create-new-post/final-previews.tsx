"use client";

import { useCreateNewPost } from "@/hooks/use-create-new-post";
import Image from "next/image";
import { Loading } from "../loading";
import { ElementRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonChangeImage } from "./btn-change-image";

export const FinalPreviews = () => {
  const { arrCroppedImgData, direction, aspectRatio } = useCreateNewPost();

  const loaderRef = useRef<ElementRef<"div">>(null);

  const [croppedIndex, setCroppedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 350);

    const target = loaderRef.current;
    if (target) {
      const animationEnd = () => {
        target.classList.remove("animate-fade-out");
        target.style.display = "none";
      };

      target.addEventListener("animationend", animationEnd, { once: true });

      return () => {
        target.removeEventListener("animationend", animationEnd);
      };
    }
  }, []);

  return (
    <div className="relative size-[475px] flex items-center justify-center bg-neutral-950/40 overflow-hidden">
      {arrCroppedImgData && (
        <>
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
        </>
      )}
      <div
        ref={loaderRef}
        className={cn(
          "size-full absolute bottom-0 left-0 flex items-center justify-center bg-slate-900",
          arrCroppedImgData && !isLoading && "animate-fade-out"
        )}
      >
        {(!arrCroppedImgData || isLoading) && <Loading />}
      </div>
    </div>
  );
};
