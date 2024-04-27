"use client";

import { useTheme } from "next-themes";

export const SelectTheme = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <div onClick={() => setTheme("system")}>System</div>
      <div onClick={() => setTheme("light")}>Light</div>
      <div onClick={() => setTheme("dark")}>Dark</div>
      <div onClick={() => setTheme("blue")}>Blue</div>
    </>
  );
};
