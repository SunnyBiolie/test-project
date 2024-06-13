"use client";

import { ElementRef, useEffect, useRef } from "react";
import { IUConfigValues } from "./create-new-post";
import { IoImagesOutline } from "react-icons/io5";
import { useCreateNewPost } from "@/hooks/use-create-new-post";

export const ImageUploadInput = () => {
  const { files, setFiles } = useCreateNewPost();

  const inputFileRef = useRef<ElementRef<"input">>(null);
  const selectImageRef = useRef<ElementRef<"button">>(null);
  const dropZoneRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const inputFileTarget = inputFileRef.current;
    const selectImageTarget = selectImageRef.current;
    const dropZoneTarget = dropZoneRef.current;
    if (inputFileTarget && selectImageTarget && dropZoneTarget) {
      selectImageTarget.onclick = () => {
        inputFileTarget.click();
      };
      inputFileTarget.onchange = () => {
        if (inputFileTarget.files && !files) {
          const newImageFiles = Array.from(inputFileTarget.files);
          if (newImageFiles.length > IUConfigValues.maxImageFiles) return;
          setFiles(newImageFiles);
        }
      };

      dropZoneTarget.ondragover = (e) => {
        e.preventDefault();
        dropZoneTarget.classList.remove("border-dark_3");
        dropZoneTarget.classList.add("border-light_3");
      };
      dropZoneTarget.ondragleave = (e) => {
        e.preventDefault();
        dropZoneTarget.classList.add("border-dark_3");
        dropZoneTarget.classList.remove("border-light_3");
      };
      dropZoneTarget.ondrop = (e) => {
        e.preventDefault();
        dropZoneTarget.classList.add("border-dark_3");
        dropZoneTarget.classList.remove("border-light_3");
        const fileList = e.dataTransfer?.files;
        if (fileList && !files) {
          const newImageFiles = Array.from(fileList);
          if (newImageFiles.length > IUConfigValues.maxImageFiles) return;
          setFiles(newImageFiles);
        }
      };

      return () => {
        selectImageTarget.onclick = null;
        inputFileTarget.onchange = null;
        dropZoneTarget.ondragover = null;
        dropZoneTarget.ondragleave = null;
        dropZoneTarget.ondrop = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <input ref={inputFileRef} type="file" accept="image/*" multiple hidden />
      <div
        ref={dropZoneRef}
        className="size-[475px] flex flex-col items-center justify-center gap-y-4 p-4 rounded-lg border-2 border-dashed border-dark_3 text-light_2"
      >
        <IoImagesOutline className="size-12" />
        Drag and drop photos here
        <button
          ref={selectImageRef}
          className="py-2 px-3 rounded-md bg-light_1 text-dark_3 font-medium"
        >
          Select photos
        </button>
      </div>
    </div>
  );
};
