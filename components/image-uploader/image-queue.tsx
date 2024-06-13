import { ElementRef, useEffect, useRef } from "react";
import Image from "next/image";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IUConfigValues } from "./create-new-post";
// import validQuantityImageFiles from "./valid-quantity-images";

export const ImageQueue = () => {
  const { files, setFiles, currentIndex, setCurrentIndex, arrImgPreCropData } =
    useCreateNewPost();

  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    const target = inputRef.current;
    if (target && files) {
      target.onchange = () => {
        if (target.files) {
          const newImageFiles = Array.from(target.files);
          if (files.length === IUConfigValues.maxImageFiles) {
            console.warn(
              `Đã có đủ tối đa ${IUConfigValues.maxImageFiles} hình ảnh cho bài viết.`
            );
            return;
          }
          if (
            files.length + newImageFiles.length >
            IUConfigValues.maxImageFiles
          ) {
            return;
          } else {
            setFiles([...files, ...newImageFiles]);
            // // Set currentIndex bằng với phần tử đầu tiên được thêm
            setCurrentIndex(files.length);
          }
        }
      };

      return () => {
        target.onchange = null;
      };
    }
    // Nếu không chạy lại mỗi khi files thay đổi thì files trong useEffect sẽ không bao giờ được cập nhật
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const hanldeAddImage = () => {
    const target = inputRef.current;
    if (target && files?.length !== IUConfigValues.maxImageFiles) {
      target.click();
    }
  };

  if (!arrImgPreCropData) return;

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden />
      <div className="flex items-center gap-4">
        <div className="w-full h-[72px] flex items-center gap-2">
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
  const { files, setFiles, currentIndex, setCurrentIndex, arrImgPreCropData } =
    useCreateNewPost();

  const handleRemoveImage = () => {
    if (!files) return;
    if (currentIndex === files.length - 1)
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (files.length === 1) {
      setFiles(undefined);
    } else
      setFiles((prev) => {
        return prev!.toSpliced(currentIndex, 1);
      });
  };

  if (!arrImgPreCropData) return;

  return (
    <>
      {index === currentIndex ? (
        <div className="relative size-12 mx-3 scale-150 bg-dark_3 rounded-sm overflow-hidden transition-all">
          <Image
            src={arrImgPreCropData[index]?.url || "/logo.png"}
            alt=""
            fill
            className="object-cover"
          />
          <div
            className="absolute top-[3px] right-[3px] p-[3px] rounded-full bg-neutral-800/75 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <IoClose className="size-3" />
          </div>
        </div>
      ) : (
        arrImgPreCropData[index]?.url && (
          <div className="relative size-12 bg-dark_3 rounded-sm overflow-hidden transition-all">
            <Image
              src={arrImgPreCropData[index].url || "/logo.png"}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute size-full top-0 left-0 bg-slate-700/50" />
          </div>
        )
      )}
    </>
  );
};
