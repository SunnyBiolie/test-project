"use client";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ButtonChangeImageProps {
  action: "prev" | "next";
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const ButtonChangeImage = ({
  action,
  setCurrentIndex,
}: ButtonChangeImageProps) => {
  const handleChangeImage = (action: "next" | "prev") => {
    switch (action) {
      case "next":
        setCurrentIndex((prev) => ++prev);
        break;
      case "prev":
        setCurrentIndex((prev) => --prev);
        break;
    }
  };

  return (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2 bg-neutral-950/60 rounded-full size-8 flex items-center justify-center cursor-pointer hover:bg-neutral-950/75 transition-all",
        action === "prev" ? "left-3" : "right-3"
      )}
      onClick={() => handleChangeImage(action)}
    >
      {action === "prev" ? (
        <IoIosArrowBack className="size-5" />
      ) : (
        <IoIosArrowForward className="size-5" />
      )}
    </div>
  );
};
