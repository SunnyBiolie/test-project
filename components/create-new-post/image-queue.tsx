import { CSSProperties, ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { configValues } from "./create-post-container";
import { checkNewImagesValid } from "./utils";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";

const itemSize = 80;
const spaceX = 8;

export const ImageQueue = () => {
  const {
    imageFiles,
    setImageFiles,
    currentIndex,
    setCurrentIndex,
    arrImgPreCropData,
  } = useCreateNewPost();

  const inputRef = useRef<ElementRef<"input">>(null);
  const queueContainerRef = useRef<ElementRef<"div">>(null);

  const [arrLeft, setArrLeft] = useState<string[]>();

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
          } else {
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

          // Reset input value
          inputTarget.value = "";
          if (inputTarget.value) {
            inputTarget.type = "text";
            inputTarget.type = "file";
          }
        }
      };

      return () => {
        inputTarget.onchange = null;
      };
    }
    // Nếu không chạy lại mỗi khi imageFiles thay đổi thì imageFiles trong useEffect sẽ không bao giờ được cập nhật
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFiles]);

  useEffect(() => {
    const containerTarget = queueContainerRef.current;
    if (containerTarget && arrImgPreCropData) {
      const containerWidth = containerTarget.offsetWidth;

      const arr = arrImgPreCropData.map((item, index) => {
        const itemWidth = itemSize + spaceX;
        const lastRest = itemWidth - (containerWidth % itemWidth);

        let left: string = "";
        if (arrImgPreCropData.length !== configValues.maxImageFiles) {
          switch (currentIndex) {
            case 0:
              left = index * itemWidth + "px";
              break;
            case arrImgPreCropData.length - 1:
              left = (index - currentIndex + 2) * itemWidth - lastRest + "px";
              break;
            default:
              left = (index - currentIndex + 1) * itemWidth + "px";
              break;
          }
          return left;
        } else {
          switch (currentIndex) {
            case 0:
              left = index * itemWidth + "px";
              break;
            case arrImgPreCropData.length - 2:
            case arrImgPreCropData.length - 1:
              left =
                (index - (arrImgPreCropData.length - 1) + 3) * itemWidth -
                lastRest +
                "px";
              break;
            default:
              left = (index - currentIndex + 1) * itemWidth + "px";
              break;
          }
          return left;
        }
      });

      setArrLeft(arr);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, arrImgPreCropData]);

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
        <div
          ref={queueContainerRef}
          className="relative w-full overflow-hidden"
        >
          <div className="relative" style={{ height: itemSize + "px" }}>
            {arrLeft &&
              arrImgPreCropData.map((imgData, index) => (
                <ImageQueueItem
                  key={index}
                  index={index}
                  style={{
                    left: `${arrLeft[index]}`,
                  }}
                />
              ))}
          </div>
        </div>
        {imageFiles.length < configValues.maxImageFiles && (
          <div className="shrink-0 relative w-12 h-full flex items-center justify-center">
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
              <GoPlus className="size-8 m-2" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

interface ImageQueueItemProps {
  index: number;
  style?: CSSProperties;
}

const ImageQueueItem = ({ index, style }: ImageQueueItemProps) => {
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

  const handleOnClick = () => {
    setCurrentIndex(index);
  };

  return (
    <>
      {imgPreCropData && (
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-dark_3 rounded-sm overflow-hidden transition-all duration-300 animate-fade-in"
          style={{ width: itemSize + "px", height: itemSize + "px", ...style }}
          onClick={handleOnClick}
        >
          <div
            style={{ backgroundImage: `url("${imgPreCropData.originURL}")` }}
            className="size-full bg-neutral-700/75 bg-cover bg-no-repeat bg-center"
          />
          {index === currentIndex ? (
            <div
              className="absolute top-1 right-1 p-1 rounded-full bg-neutral-800/75 cursor-pointer"
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
              <IoClose className="size-4" />
            </div>
          ) : (
            <div className="absolute size-full top-0 left-0 bg-slate-800/60" />
          )}
        </div>
      )}
    </>
  );
};
