"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { type IconType } from "react-icons";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  IoAddCircleOutline,
  IoAddCircleSharp,
  IoPeopleOutline,
  IoPeopleSharp,
  IoSearchCircle,
  IoSearchCircleOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";

import { cn } from "@/lib/utils";
import { NavItem } from "./nav-item";

interface MainNavBarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  isActive: boolean;
  Icon: IconType;
  IconFill: IconType;
}

export const MainNavBar = ({ className }: MainNavBarProps) => {
  const pathname = usePathname();

  const navbarItem: NavItem[] = [
    {
      title: "Home",
      href: "/",
      isActive: pathname === "/",
      Icon: GoHome,
      IconFill: GoHomeFill,
    },
    {
      title: "Create",
      href: "/create",
      isActive: pathname === "/create",
      Icon: IoAddCircleOutline,
      IconFill: IoAddCircleSharp,
    },
    {
      title: "Search",
      href: "/search",
      isActive: pathname === "/search",
      Icon: IoSearchCircleOutline,
      IconFill: IoSearchCircle,
    },
    {
      title: "Following",
      href: "/following",
      isActive: pathname === "/following",
      Icon: IoPeopleOutline,
      IconFill: IoPeopleSharp,
    },
    {
      title: "Settings",
      href: "/settings",
      isActive: pathname === "/settings",
      Icon: IoSettingsOutline,
      IconFill: IoSettingsSharp,
    },
  ];

  const [activeBGPosition, setActiveBGPosition] = useState<number | null>(null);
  const [isInProfile, setIsInProfile] = useState<boolean>(
    pathname === "/profile"
  );

  useEffect(() => {
    let check = false;
    navbarItem.forEach((item) => {
      if (item.isActive) {
        check = true;
      }
    });
    if (!check) {
      setActiveBGPosition(null);
    }

    setIsInProfile(pathname === "/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={cn(
        "h-full w-20 lg:w-60 p-3 flex flex-col items-center border-r border-neutral-300 dark:border-neutral-700",
        className
      )}
    >
      <div className="w-full lg:px-3 py-5 font-semibold text-lg flex items-center justify-center lg:justify-start gap-x-4">
        <div className="relative size-10">
          <Image
            src={"/logo.png"}
            alt="Photograms's logo"
            fill
            sizes="autos"
            priority
          />
        </div>
        <p className="hidden lg:block">Photogram</p>
      </div>
      <div className="flex-1 w-full flex flex-col items-center py-3">
        <nav className="flex-1 relative w-12 lg:w-full">
          <div className="absolute w-full z-10">
            {navbarItem.map((item, index) => (
              <NavItem
                key={index}
                title={item.title}
                href={item.href}
                isActive={item.isActive}
                Icon={item.Icon}
                IconFill={item.IconFill}
                activeBGPosition={activeBGPosition}
                setActiveBGPosition={setActiveBGPosition}
              />
            ))}
          </div>
          {activeBGPosition && (
            <div
              className="hidden lg:block absolute w-full h-12 rounded-lg bg-neutral-800 dark:bg-neutral-600/40 transition-all duration-300 z-0"
              style={{ top: `${activeBGPosition}px` }}
            />
          )}
        </nav>
        <Link
          href={"/profile"}
          className={cn(
            "group w-12 lg:w-full h-12 lg:h-14 flex items-center justify-center lg:justify-start gap-x-3 lg:px-3 my-3 rounded-full lg:rounded-lg",
            isInProfile
              ? "bg-neutral-800 dark:bg-neutral-600/40 lg:text-white lg:dark:text-accent-foreground"
              : "lg:hover:bg-neutral-300/40 lg:hover:dark:bg-neutral-600/40"
          )}
        >
          <div
            className={cn(
              "relative size-9 rounded-full bg-neutral-500 overflow-hidden",
              isInProfile
                ? "size-full aspect-square lg:size-9 border-[3px] border-sky-700 dark:border-sky-500 lg:border-none"
                : "group-hover:size-full lg:group-hover:size-9"
            )}
          >
            <Image src="" alt="" className="object-cover" fill sizes="auto" />
          </div>
          <div className="font-semibold hidden lg:block">Profile</div>
        </Link>
      </div>
    </div>
  );
};
