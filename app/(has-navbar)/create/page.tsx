"use client";

import { uploadImage } from "@/action/upload-image-2";
import { CreateNewPost } from "@/components/image-uploader/create-new-post";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const CreatePage = () => {
  return (
    <div className="h-full flex items-center justify-center overflow-auto">
      <CreateNewPost />
    </div>
  );
};

export default CreatePage;
