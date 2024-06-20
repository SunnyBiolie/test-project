import { IconType } from "react-icons";

interface CreatePostHeaderProps {
  tilte: string;
  LeftBtn: string | IconType;
  handleLeftBtn: () => void;
  rightBtn: string;
  handleRightBtn: () => void;
}

export const CreatePostHeader = ({
  tilte,
  LeftBtn,
  handleLeftBtn,
  rightBtn,
  handleRightBtn,
}: CreatePostHeaderProps) => {
  return (
    <div className="relative flex items-center justify-center py-2.5 font-medium bg-slate-800">
      <h3>{tilte}</h3>
      <div className="absolute size-full top-0 left-0 flex items-center justify-between px-2 text-sm">
        <button className="cursor-pointer py-1 px-2" onClick={handleLeftBtn}>
          {typeof LeftBtn === "string" ? (
            LeftBtn
          ) : (
            <LeftBtn className="size-6" />
          )}
        </button>
        <button className="cursor-pointer py-1 px-2" onClick={handleRightBtn}>
          {rightBtn}
        </button>
      </div>
    </div>
  );
};
