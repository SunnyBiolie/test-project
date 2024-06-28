"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ToggleButtonProps {
  defaultValue?: boolean;
  doWhenCheck: () => void;
  doWhenNotCheck: () => void;
}

export const ToggleButton = ({
  defaultValue = false,
  doWhenCheck,
  doWhenNotCheck,
}: ToggleButtonProps) => {
  const [isCheck, setIsCheck] = useState(defaultValue);

  const handleCheck = () => {
    setIsCheck((prev) => !prev);
    if (isCheck) doWhenNotCheck();
    else doWhenCheck();
  };

  return (
    <div
      className={cn(
        "shrink-0 h-6 w-11 rounded-full flex items-center justify-center cursor-pointer transition-colors",
        !isCheck ? "bg-slate-600" : "bg-neutral-300"
      )}
      onClick={handleCheck}
    >
      <div className="relative h-5 w-10">
        <div
          className={cn(
            "size-5 absolute top-0 rounded-full bg-slate-900 transition-all",
            !isCheck ? "left-0" : "left-full -translate-x-full"
          )}
        ></div>
      </div>
    </div>
  );
};
