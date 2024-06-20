import { ElementRef, useEffect, useRef } from "react";
import Image from "next/image";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IUConfigValues } from "./create-new-post";
import { cn } from "@/lib/utils";

export const ImageQueue = () => {
  const {
    imageFiles,
    setImageFiles,
    currentIndex,
    setCurrentIndex,
    arrImgPreCropData,
  } = useCreateNewPost();

  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    const inputTarget = inputRef.current;
    if (inputTarget && imageFiles) {
      inputTarget.onchange = () => {
        if (inputTarget.files && inputTarget.files.length > 0) {
          const files = Array.from(inputTarget.files);
          if (imageFiles.length === IUConfigValues.maxImageFiles) return;
          if (imageFiles.length + files.length > IUConfigValues.maxImageFiles) {
            return console.error("Giới hạn 6 file");
          }

          let isExistsFile = false;
          files.forEach((newfile) => {
            imageFiles.forEach((existsFileData) => {
              if (newfile.name === existsFileData.file.name)
                return (isExistsFile = true);
            });
          });

          if (isExistsFile) {
            return console.error("File(s) already exists");
          }

          const newImageFiles = files.map((file) => {
            const id = crypto.randomUUID();
            return {
              id,
              file,
            };
          });
          setImageFiles([...imageFiles, ...newImageFiles]);
          // Set currentIndex bằng với phần tử đầu tiên được thêm
          setCurrentIndex(imageFiles.length);
        }
      };

      return () => {
        inputTarget.onchange = null;
      };
    }
    // Nếu không chạy lại mỗi khi imageFiles thay đổi thì imageFiles trong useEffect sẽ không bao giờ được cập nhật
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFiles]);

  useEffect(() => {}, [currentIndex]);

  if (!imageFiles || !arrImgPreCropData) return;

  const hanldeAddImage = () => {
    const inputTarget = inputRef.current;
    if (!inputTarget) return;
    if (imageFiles.length < IUConfigValues.maxImageFiles) {
      inputTarget.click();
    } else {
      console.warn(
        `Đã có đủ tối đa ${IUConfigValues.maxImageFiles} hình ảnh cho bài viết.`
      );
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden />
      <div className="flex items-center gap-4">
        {/* <div className="w-full h-[72px] flex items-center gap-2">
          <ImageQueueItem
            index={
              currentIndex === 0
                ? currentIndex
                : currentIndex === arrImgPreCropData.length - 1
                ? currentIndex - 2
                : currentIndex - 1
            }
          />
          <ImageQueueItem
            index={
              currentIndex === 0
                ? currentIndex + 1
                : currentIndex === arrImgPreCropData.length - 1
                ? currentIndex - 1
                : currentIndex
            }
          />
          <ImageQueueItem
            index={
              currentIndex === 0
                ? currentIndex + 2
                : currentIndex === arrImgPreCropData.length - 1
                ? currentIndex
                : currentIndex + 1
            }
          />
        </div> */}
        <div className="relative w-full h-[72px] overflow-hidden">
          <div
            className="h-full absolute flex items-center gap-x-2.5 transition-all"
            style={{ left: `-${(currentIndex - 1) * 58}px` }}
          >
            {arrImgPreCropData.map((imgData, index) => (
              <ImageQueueItem key={index} index={index} />
            ))}
          </div>
        </div>
        <div className="relative w-12 h-full flex items-center justify-center">
          <div
            className="bg-dark_3 rounded-full overflow-hidden cursor-pointer hover:bg-light_3"
            onClick={hanldeAddImage}
          >
            <GoPlus className="size-7 m-2.5" />
          </div>
        </div>
      </div>
    </>
  );
};

interface ImageQueueItemProps {
  index: number;
}

const ImageQueueItem = ({ index }: ImageQueueItemProps) => {
  const {
    setState,
    imageFiles,
    setImageFiles,
    currentIndex,
    setCurrentIndex,
    arrImgPreCropData,
  } = useCreateNewPost();

  const handleRemoveImage = () => {
    if (!imageFiles) return;
    if (currentIndex === imageFiles.length - 1)
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (imageFiles.length === 1) {
      setState("se");
      setImageFiles(undefined);
    } else
      setImageFiles((prev) => {
        return prev!.toSpliced(currentIndex, 1);
      });
  };

  if (!arrImgPreCropData) return;
  const imgPreCropData = arrImgPreCropData[index];

  return (
    <>
      {imgPreCropData &&
        (index === currentIndex ? (
          <div className="relative size-12 mx-3 scale-150 bg-dark_3 rounded-sm overflow-hidden transition-all">
            <div
              style={{ backgroundImage: `url("${imgPreCropData.originURL}")` }}
              className="size-full bg-neutral-700/75 bg-cover bg-no-repeat bg-center"
            />
            <div
              className="absolute top-[3px] right-[3px] p-[3px] rounded-full bg-neutral-800/75 cursor-pointer"
              onClick={handleRemoveImage}
            >
              <IoClose className="size-3" />
            </div>
          </div>
        ) : (
          <div className="relative size-12 bg-dark_3 rounded-sm overflow-hidden transition-all">
            <div
              style={{ backgroundImage: `url("${imgPreCropData.originURL}")` }}
              className="size-full bg-neutral-700/75 bg-cover bg-no-repeat bg-center"
            />
            <div className="absolute size-full top-0 left-0 bg-slate-700/50" />
          </div>
        ))}
    </>
  );
};
