"use client";

import {
  type Dispatch,
  type SetStateAction,
  MouseEvent,
  useEffect,
  useRef,
  ElementRef,
} from "react";
import Link from "next/link";
import { type IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  href: string;
  isActive: boolean;
  Icon: IconType;
  IconFill: IconType;
  activeBGPosition: number | null;
  setActiveBGPosition: Dispatch<SetStateAction<number | null>>;
}

export const NavItem = ({
  title,
  href,
  isActive,
  Icon,
  IconFill,
  activeBGPosition,
  setActiveBGPosition,
}: NavItemProps) => {
  const ref = useRef<ElementRef<"a">>(null);

  useEffect(() => {
    if (isActive && ref.current) setActiveBGPosition(ref.current.offsetTop);
  }, [isActive, setActiveBGPosition]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setActiveBGPosition(e.currentTarget.offsetTop);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "group flex items-center justify-center lg:justify-start gap-x-4 w-12 lg:w-full h-12 px-3 my-1 rounded-lg transition cursor-pointer font-semibold",
        !isActive
          ? "hover:font-bold hover:bg-neutral-300/40 hover:dark:bg-neutral-600/40 lg:hover:bg-transparent lg:hover:dark:bg-transparent"
          : activeBGPosition !== null && "lg:text-white"
      )}
      onClick={onClick}
    >
      <div className="relative size-7">
        {isActive ? (
          <IconFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7 text-sky-700 dark:text-sky-500 lg:text-white lg:dark:text-accent-foreground" />
        ) : (
          <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7 group-hover:size-[30px]" />
        )}
      </div>
      <div className="hidden lg:block">{title}</div>
    </Link>
  );
};
