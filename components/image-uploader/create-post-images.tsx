"use client";

import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { CreatePostHeader } from "./create-post-header";
import { ImageUploadParameters } from "./iu-parameters";
import { ImageUploadPreview } from "./iu-preview";
import createArrayCroppedImage from "./create-array-cropped-image";

export const CreatePostImages = () => {
  const { setImageFiles, setState, arrImgPreCropData, setArrCroppedImgData } =
    useCreateNewPost();

  if (!arrImgPreCropData) return;

  const handleDiscard = () => {
    setState("se");
    setImageFiles(undefined);
  };

  const hanldeNextStep = () => {
    setState("in");
    createArrayCroppedImage(arrImgPreCropData, setArrCroppedImgData);
  };
  return (
    <div className="w-[760px] flex flex-col rounded-md overflow-hidden animate-fade-in">
      <CreatePostHeader
        tilte="Creating a new post"
        LeftBtn="Discard"
        handleLeftBtn={handleDiscard}
        rightBtn="Next"
        handleRightBtn={hanldeNextStep}
      />
      <div className="flex">
        <ImageUploadPreview />
        <ImageUploadParameters />
      </div>
    </div>
  );
};
