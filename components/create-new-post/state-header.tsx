import { IconType } from "react-icons";

interface StateHeaderProps {
  tilte: string;
  LeftBtn: string | IconType;
  abbrTitle?: string;
  handleLeftBtn: () => void;
  rightBtn: string;
  handleRightBtn: () => void;
}

export const StateHeader = ({
  tilte,
  LeftBtn,
  abbrTitle,
  handleLeftBtn,
  rightBtn,
  handleRightBtn,
}: StateHeaderProps) => {
  return (
    <div className="relative flex items-center justify-center font-medium py-2.5 bg-slate-800">
      <h3 className="font-semibold">{tilte}</h3>
      <div className="absolute size-full top-0 left-0 flex items-center justify-between px-2 text-sm">
        <button className="cursor-pointer py-1 px-2" onClick={handleLeftBtn}>
          {typeof LeftBtn === "string" ? (
            LeftBtn
          ) : (
            <abbr title={abbrTitle}>
              <LeftBtn className="size-6" />
            </abbr>
          )}
        </button>
        <button
          className="cursor-pointer py-1 px-2 hover:text-sky-400"
          onClick={handleRightBtn}
        >
          {rightBtn}
        </button>
      </div>
    </div>
  );
};
