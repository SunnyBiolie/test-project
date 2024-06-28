import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbLoader } from "react-icons/tb";

export const Loading = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <TbLoader className="size-6 animate-spin" />
    </div>
  );
};
