"use client";

import { ElementRef, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCreateNewPost } from "@/hooks/use-create-new-post";
import { StateHeader } from "./state-header";
import { FinalPreviews } from "./final-previews";
import { HiArrowLeft } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { ToggleButton } from "../toggle-button";
import { createPost } from "@/action/create-post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const maxCaptionLength = 800;
type PostSettings = {
  hideLikeCounts: boolean;
  turnOffCmt: boolean;
};

export const CreatePostFinalState = () => {
  const router = useRouter();

  const { setState, arrCroppedImgData, setArrCroppedImgData, setDialog } =
    useCreateNewPost();

  const captionRef = useRef<ElementRef<"p">>(null);

  const [caption, setCaption] = useState<string>();
  const [postSettings, setPostSettings] = useState<PostSettings>({
    hideLikeCounts: false,
    turnOffCmt: false,
  });

  const [isSharing, setIsSharing] = useState(false);

  const handleBack = () => {
    setDialog({
      title: "Back to edit?",
      message: "If you leave, your changes won't be saved.",
      acceptText: "Back",
      handleAccept: () => {
        if (!arrCroppedImgData)
          return console.error(`"arrCroppedImgData" is undefined!`);

        setState("ar");
        arrCroppedImgData.forEach((item) => {
          URL.revokeObjectURL(item.croppedURL);
        });
        setArrCroppedImgData(undefined);
        setDialog(undefined);
      },
      handleCancel: () => setDialog(undefined),
    });
  };

  const handleSharePost = async () => {
    if (!arrCroppedImgData) return;

    let type: string;

    setDialog({
      title: "Share this post?",
      message: "This post will be shared with everyone.",
      type: "double-check",
      acceptText: "Share it",
      handleAcceptWithLoadingState: async () => {
        let listImagesData: Uint8Array[] = [];
        arrCroppedImgData.forEach((item) => {
          listImagesData.push(item.bytes);
        });
        const res = await createPost(
          listImagesData,
          caption,
          postSettings.hideLikeCounts,
          postSettings.turnOffCmt
        );
        toast[res.type](res.message);
        type = res.type;
        return type;
      },
      handleLoadingDone: () => {
        setDialog(undefined);

        if (type === "success") {
          router.push("/");
        } else if (type === "error") {
        }
      },
      handleCancel: () => setDialog(undefined),
    });
  };

  return (
    <div className="animate-fade-in">
      <StateHeader
        tilte="Create new post"
        LeftBtn={HiArrowLeft}
        abbrTitle="Back"
        handleLeftBtn={handleBack}
        rightBtn="Share"
        handleRightBtn={handleSharePost}
      />
      <div className="flex">
        <FinalPreviews />
        <div className="flex-1 w-[325px] bg-dark_2">
          <div className="flex items-center gap-x-3 my-4 mx-4">
            <div className="relative size-7 rounded-full overflow-hidden">
              <Image
                src="https://telegraph-image-bak.pages.dev/file/32a611706725087d0baf4.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold">sunny_biolie</span>
          </div>
          <div className="px-5 text-sm">
            <div
              className="relative max-h-52 min-h-40 overflow-auto break-words"
              onClick={() => {
                const captionTarget = captionRef.current;
                if (captionTarget) {
                  captionTarget.focus();
                  const range = document.createRange();
                  const selection = window.getSelection();

                  // Đặt range tại cuối của nội dung của phần tử
                  range.selectNodeContents(captionTarget);
                  range.collapse(false); // Đặt con trỏ tại cuối

                  if (selection) {
                    // Xóa tất cả các selections hiện tại
                    selection.removeAllRanges();
                    // Thêm range mới
                    selection.addRange(range);
                  }
                }
              }}
            >
              {!caption && (
                <p className="absolute top-0 left-0 text-neutral-400">
                  Write your caption...
                </p>
              )}
              <p
                ref={captionRef}
                className="relative z-10 focus-visible:outline-none"
                onBeforeInput={(e) => {
                  const event = e as unknown as InputEvent;
                  const len = event.data ? event.data.length : 0;
                  if (e.currentTarget.innerText.length + len > maxCaptionLength)
                    e.preventDefault();
                }}
                onPaste={(e) => {
                  const clipboardData = e.clipboardData;
                  const pasteData = clipboardData.getData("Text");
                  if (
                    e.currentTarget.innerText.length + pasteData.length >
                    maxCaptionLength
                  )
                    e.preventDefault();
                }}
                onInput={(e) => {
                  const target = e.currentTarget;

                  if (target.innerText.length > maxCaptionLength) {
                    setCaption(target.innerText.substring(0, maxCaptionLength));
                  } else {
                    setCaption(target.innerText);
                  }
                }}
                contentEditable
                suppressContentEditableWarning={true}
              >
                <br />
              </p>
            </div>
            <div className=" text-right py-2">
              <span className="text-xs font-medium text-neutral-500">
                {caption ? caption.length : 0}/{maxCaptionLength}
              </span>
            </div>
          </div>
          <div className="mx-4">
            <div className="font-semibold py-2 mb-1 flex items-center justify-between">
              <span>Other settings</span>
              <IoIosArrowUp className="size-5" />
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center gap-x-2">
                  <ToggleButton
                    defaultValue={postSettings.hideLikeCounts}
                    doWhenCheck={() =>
                      setPostSettings((prev) => {
                        prev.hideLikeCounts = true;
                        return prev;
                      })
                    }
                    doWhenNotCheck={() =>
                      setPostSettings((prev) => {
                        prev.hideLikeCounts = false;
                        return prev;
                      })
                    }
                  />
                  <span className="text-sm">Hide like counts on this post</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <ToggleButton
                    defaultValue={postSettings.turnOffCmt}
                    doWhenCheck={() =>
                      setPostSettings((prev) => {
                        prev.turnOffCmt = true;
                        return prev;
                      })
                    }
                    doWhenNotCheck={() =>
                      setPostSettings((prev) => {
                        prev.turnOffCmt = false;
                        return prev;
                      })
                    }
                  />
                  <span className="text-sm">Turn off commenting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
