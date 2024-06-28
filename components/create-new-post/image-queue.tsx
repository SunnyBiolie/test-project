import { ElementRef, useEffect, useRef } from "react";
import { configValues } from "./create-post-container";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { checkNewImagesValid } from "./utils";
import { toast } from "sonner";

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

          const { validFiles, typeError, sizeError } = checkNewImagesValid(
            files,
            configValues.maxImageFiles - imageFiles.length,
            configValues.limitSize
          );

          if (typeError || sizeError) {
            if (typeError) {
              toast.error("This file is not supported", {
                description: `"${typeError}" could not be uploaded.`,
              });
            }

            if (sizeError) {
              toast.error("This file is too large", {
                description: `"${sizeError}" is bigger than ${configValues.limitSize}MB and could not be uploaded.`,
              });
            }

            // Reset input value
            inputTarget.value = "";
            if (inputTarget.value) {
              inputTarget.type = "text";
              inputTarget.type = "file";
            }
            return;
          }

          const newImageFiles = validFiles.map((file) => {
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

  if (!imageFiles || !arrImgPreCropData) return;

  const hanldeAddImage = () => {
    const inputTarget = inputRef.current;
    if (!inputTarget) return;
    if (imageFiles.length < configValues.maxImageFiles) {
      inputTarget.click();
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative w-full h-[72px] overflow-hidden">
          <div
            className="h-full absolute flex items-center gap-x-2.5 transition-all"
            style={{
              left: `-${
                imageFiles.length === configValues.maxImageFiles
                  ? currentIndex !== arrImgPreCropData.length - 1
                    ? (currentIndex - 2) * 58 + "px"
                    : (currentIndex - 3) * 58 + "px"
                  : currentIndex !== arrImgPreCropData.length - 1
                  ? (currentIndex - 1) * 58 + "px"
                  : (currentIndex - 2) * 58 + "px"
              }`,
            }}
          >
            {arrImgPreCropData.map((imgData, index) => (
              <ImageQueueItem key={index} index={index} />
            ))}
          </div>
        </div>
        {imageFiles.length < configValues.maxImageFiles && (
          <div className="relative w-12 h-full flex items-center justify-center">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
            />

            <div
              className="bg-dark_3 rounded-full overflow-hidden cursor-pointer hover:bg-light_3"
              onClick={hanldeAddImage}
            >
              <GoPlus className="size-7 m-2.5" />
            </div>
          </div>
        )}
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
    setDialog,
  } = useCreateNewPost();

  const handleRemoveImage = () => {
    if (imageFiles) {
      if (currentIndex === imageFiles.length - 1)
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      if (imageFiles.length === 1) {
        setState("se");
        setImageFiles(undefined);
      } else
        setImageFiles((prev) => {
          return prev!.toSpliced(currentIndex, 1);
        });
    }
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
              onClick={() =>
                setDialog({
                  title: "Discard photo?",
                  message: "This will remove the photo from your post.",
                  acceptText: "Discard",
                  handleAccept: () => {
                    handleRemoveImage();
                    setDialog(undefined);
                  },
                  handleCancel: () => setDialog(undefined),
                })
              }
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
