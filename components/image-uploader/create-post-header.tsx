interface CreatePostHeaderProps {
  tilte: string;
  leftBtn: string;
  handleLeftBtn: () => void;
  rightBtn: string;
  handleRightBtn: () => void;
}

export const CreatePostHeader = ({
  tilte,
  leftBtn,
  handleLeftBtn,
  rightBtn,
  handleRightBtn,
}: CreatePostHeaderProps) => {
  return (
    <div className="relative flex items-center justify-center py-2.5 font-medium bg-slate-800">
      <h3>{tilte}</h3>
      <div className="absolute size-full top-0 left-0 flex items-center justify-between px-4 text-sm">
        <button className="cursor-pointer" onClick={handleLeftBtn}>
          {leftBtn}
        </button>
        <button className="cursor-pointer" onClick={handleRightBtn}>
          {rightBtn}
        </button>
      </div>
    </div>
  );
};
