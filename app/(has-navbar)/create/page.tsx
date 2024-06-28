"use client";

import { CreatePostContainer } from "@/components/create-new-post/create-post-container";

const CreatePage = () => {
  return (
    <div className="h-full flex items-center justify-center overflow-auto">
      <CreatePostContainer />
    </div>
  );
};

export default CreatePage;
