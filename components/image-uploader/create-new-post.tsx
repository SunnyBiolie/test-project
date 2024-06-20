"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { ImageUploadInput } from "./iu-input";
import {
  type CreatePostState,
  type AspectRatio,
  type Direction,
  type ImgPreCropData,
  type ImgCroppedData,
  ImageFile,
} from "@/types/create-post-type";
import { ImageUploadAdvancedCropper } from "./iu-advanced-cropper";
import { calPercSizeAndPos } from "./utils";
import { CreatePostImages } from "./create-post-images";
import { CreatePostInfo } from "./create-post-info";

export const IUConfigValues = {
  defCurrIndex: 0,
  defDirection: "vertical" as Direction,
  defAspectRatio: 1 as AspectRatio,
  isDisplayCroppedImgs: false,
  maxImageFiles: 6,
};

type CreateNewPostContextType = {
  setState: Dispatch<SetStateAction<CreatePostState>>;
  imageFiles: ImageFile[] | undefined;
  setImageFiles: Dispatch<SetStateAction<ImageFile[] | undefined>>;
  arrImgPreCropData: ImgPreCropData[] | undefined;
  setArrImgPreCropData: Dispatch<SetStateAction<ImgPreCropData[] | undefined>>;
  arrCroppedImgData: ImgCroppedData[] | undefined;
  setArrCroppedImgData: Dispatch<SetStateAction<ImgCroppedData[] | undefined>>;
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
  const [imageFiles, setImageFiles] = useState<ImageFile[]>();
  const [arrImgPreCropData, setArrImgPreCropData] =
    useState<ImgPreCropData[]>();
  const [arrCroppedImgData, setArrCroppedImgData] =
    useState<ImgCroppedData[]>();

  const [currentIndex, setCurrentIndex] = useState(IUConfigValues.defCurrIndex);
  const [direction, setDirection] = useState<Direction>(
    IUConfigValues.defDirection
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    IUConfigValues.defAspectRatio
  );

  useEffect(() => {
    // Revoke URLs tránh tràn RAM
    arrImgPreCropData?.forEach((imgPreCropData) =>
      URL.revokeObjectURL(imgPreCropData.originURL)
    );

    if (!imageFiles) {
      // Khi xóa tất cả file: thiết đặt về mặc định
      setState("se");
      setArrImgPreCropData(undefined);
      setArrCroppedImgData(undefined);
      setCurrentIndex(IUConfigValues.defCurrIndex);
      setDirection(IUConfigValues.defDirection);
      setAspectRatio(IUConfigValues.defAspectRatio);
    } else {
      setState("ar");

      const newArrImgData: ImgPreCropData[] = [];
      imageFiles.forEach((imgFile, fileIndex) => {
        const blobImage = new Blob([imgFile.file as BlobPart], {
          type: "image/*",
        });
        const originURL = URL.createObjectURL(blobImage);

        const existsImgData = arrImgPreCropData?.find(
          (imgData) => imgFile.id === imgData.id
        );

        if (existsImgData) {
          newArrImgData[fileIndex] = {
            id: existsImgData.id,
            originURL,
            intrinsicAR: existsImgData.intrinsicAR,
            perCropSize: existsImgData.perCropSize,
            perCropPos: existsImgData.perCropPos,
          };

          if (newArrImgData.length === imageFiles.length) {
            setArrImgPreCropData(newArrImgData);
          }
        } else {
          const img = new Image();
          img.onload = () => {
            const intrinsicAR = img.naturalWidth / img.naturalHeight;

            const { perCropSize, perCropPos } = calPercSizeAndPos(
              intrinsicAR,
              aspectRatio
            );

            newArrImgData[fileIndex] = {
              id: imgFile.id,
              originURL,
              intrinsicAR,
              perCropSize,
              perCropPos,
            };

            if (newArrImgData.length === imageFiles.length) {
              setArrImgPreCropData(newArrImgData);
            }
          };
          img.src = originURL;
        }
      });
    }

    return () => {
      arrImgPreCropData?.forEach((imgPreCropData) =>
        URL.revokeObjectURL(imgPreCropData.originURL)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFiles]);

  // Kiểm tra imageFiles và arrImgPreCropData có trùng id
  useEffect(() => {
    console.log(imageFiles);
    console.log(arrImgPreCropData);
  }, [arrImgPreCropData]);

  return (
    <CreateNewPostContext.Provider
      value={{
        setState,
        imageFiles,
        setImageFiles,
        arrImgPreCropData,
        setArrImgPreCropData,
        arrCroppedImgData,
        setArrCroppedImgData,
        currentIndex,
        setCurrentIndex,
        direction,
        setDirection,
        aspectRatio,
        setAspectRatio,
      }}
    >
      <div className="shrink-0 overflow-hidden select-none">
        {state === "se" && !imageFiles ? (
          <ImageUploadInput />
        ) : (
          arrImgPreCropData &&
          (state === "ar" ? (
            <CreatePostImages />
          ) : state === "cr" ? (
            <ImageUploadAdvancedCropper />
          ) : (
            <CreatePostInfo />
          ))
        )}
      </div>
    </CreateNewPostContext.Provider>
  );
};
