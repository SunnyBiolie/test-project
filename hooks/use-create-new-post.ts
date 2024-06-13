import { useContext } from "react";
import { CreateNewPostContext } from "@/components/image-uploader/create-new-post";

export const useCreateNewPost = () => {
  const context = useContext(CreateNewPostContext);
  if (context === undefined) {
    throw new Error(
      "useCreateNewPost must be used with CreateNewPostContext.Provider"
    );
  }

  return context;
};
