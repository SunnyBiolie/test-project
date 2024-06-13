"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { ImageUploadPreview } from "./iu-preview";
import { ImageUploadParameters } from "./iu-parameters";
import validQuantityImageFiles from "./valid-quantity-images";
import setArrayImageData from "./set-array-image-data";
import { ImageUploadInput } from "./iu-input";
import {
  type CreatePostState,
  type AspectRatio,
  type Direction,
  type ImgPreCropData,
  type ImgCroppedData,
} from "@/types/create-post-type";
import { ImageUploadAdvancedCropper } from "./iu-advanced-cropper";
import { calPercSizeAndPos } from "./utils";
import { CreatePostHeader } from "./create-post-header";

export const IUConfigValues = {
  defCurrIndex: 0,
  defDirection: "vertical" as Direction,
  defAspectRatio: 1 as AspectRatio,
  maxImageFiles: 6,
};

type CreateNewPostContextType = {
  setState: Dispatch<SetStateAction<CreatePostState>>;
  files: File[] | undefined;
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  arrImgPreCropData: ImgPreCropData[] | undefined;
  setArrImgPreCropData: Dispatch<SetStateAction<ImgPreCropData[] | undefined>>;
  arrImgCroppedData: ImgCroppedData[] | undefined;
  setArrImgCroppedData: Dispatch<SetStateAction<ImgCroppedData[] | undefined>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  direction: Direction;
  setDirection: Dispatch<SetStateAction<Direction>>;
  aspectRatio: AspectRatio;
  setAspectRatio: Dispatch<SetStateAction<AspectRatio>>;
};

export const CreateNewPostContext = createContext<
  CreateNewPostContextType | undefined
>(undefined);

export const CreateNewPost = () => {
  const [state, setState] = useState<CreatePostState>("se");
  const [files, setFiles] = useState<File[]>();
  const [arrImgPreCropData, setArrImgPreCropData] =
    useState<ImgPreCropData[]>();
  const [arrImgCroppedData, setArrImgCroppedData] =
    useState<ImgCroppedData[]>();

  const [currentIndex, setCurrentIndex] = useState(IUConfigValues.defCurrIndex);
  const [direction, setDirection] = useState<Direction>(
    IUConfigValues.defDirection
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    IUConfigValues.defAspectRatio
  );

  useEffect(() => {
    if (!files) {
      // Thiết đặt về mặc định
      setState("se");
      setArrImgPreCropData(undefined);
      setArrImgCroppedData(undefined);
      setCurrentIndex(IUConfigValues.defCurrIndex);
      setDirection(IUConfigValues.defDirection);
      setAspectRatio(IUConfigValues.defAspectRatio);
    } else {
      setState("ar");
      // Revoke URLs tránh tràn RAM
      arrImgPreCropData?.forEach((img) => URL.revokeObjectURL(img.url));

      const newArrImgPreCropData: any[] = [];
      files.forEach((file, index) => {
        const blobImage = new Blob([file as BlobPart], { type: "image/*" });
        const imageURL = URL.createObjectURL(blobImage);
        const img = new Image();
        img.onload = () => {
          const intrinsicAR = img.naturalWidth / img.naturalHeight;
          const { perCropHeight, perCropWidth, perCropTop, perCropLeft } =
            calPercSizeAndPos(intrinsicAR, aspectRatio);

          newArrImgPreCropData[index] = {
            url: imageURL,
            intrinsicAR,
            perCropWidth,
            perCropHeight,
            perCropTop,
            perCropLeft,
          };

          if (newArrImgPreCropData.length === files.length) {
            setArrImgPreCropData(newArrImgPreCropData);
          }
        };
        img.src = imageURL;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    if (!arrImgPreCropData) return;

    let newArrImgPreCropData: ImgPreCropData[] = [];
    arrImgPreCropData.forEach((img, index) => {
      const { perCropHeight, perCropWidth, perCropTop, perCropLeft } =
        calPercSizeAndPos(img.intrinsicAR, aspectRatio);

      newArrImgPreCropData[index] = {
        url: img.url,
        intrinsicAR: img.intrinsicAR,
        perCropHeight,
        perCropWidth,
        perCropTop,
        perCropLeft,
      };
    });
    setArrImgPreCropData(newArrImgPreCropData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspectRatio]);

  useEffect(() => {
    if (!arrImgPreCropData) return setArrImgCroppedData(undefined);
    if (!arrImgCroppedData) {
      const newArrImgCroppedData = setArrayImageData(arrImgPreCropData);
      setArrImgCroppedData(newArrImgCroppedData);
    }
  }, [arrImgPreCropData]);

  const handleDiscard = () => {
    setState("se");
    setFiles(undefined);
  };

  const hanldeNextStep = () => {
    setState("in");
  };

  return (
    <CreateNewPostContext.Provider
      value={{
        setState,
        files,
        setFiles,
        arrImgPreCropData,
        setArrImgPreCropData,
        arrImgCroppedData,
        setArrImgCroppedData,
        direction,
        setDirection,
        aspectRatio,
        setAspectRatio,
        currentIndex,
        setCurrentIndex,
      }}
    >
      <div className="shrink-0 overflow-hidden select-none">
        {state === "se" && !files ? (
          <ImageUploadInput />
        ) : (
          arrImgPreCropData && (
            <div className="w-[760px] flex flex-col rounded-md overflow-hidden animate-fade-in">
              {state === "ar" ? (
                <>
                  <CreatePostHeader
                    tilte="Creating a new post"
                    leftBtn="Discard"
                    handleLeftBtn={handleDiscard}
                    rightBtn="Next"
                    handleRightBtn={hanldeNextStep}
                  />
                  <div className="flex">
                    <ImageUploadPreview />
                    <div className="w-[285px] bg-dark_2">
                      <ImageUploadParameters />
                    </div>
                  </div>
                </>
              ) : state === "cr" ? (
                <ImageUploadAdvancedCropper />
              ) : (
                <CreatePostHeader
                  tilte="Creating a new post"
                  leftBtn="Back"
                  handleLeftBtn={() => setState("ar")}
                  rightBtn="Next"
                  handleRightBtn={() => {}}
                />
              )}
            </div>
          )
        )}
      </div>
    </CreateNewPostContext.Provider>
  );
};
