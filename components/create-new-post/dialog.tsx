export type DialogProps = {
  title: string;
  message: string;
  acceptText: string;
  handleAccept: () => void;
  handleCancel: () => void;
};

export const Dialog = ({
  title,
  message,
  acceptText,
  handleAccept,
  handleCancel,
}: DialogProps) => {
  return (
    <div className="size-full fixed top-0 left-0 flex items-center justify-center z-50">
      <div className="size-full absolute top-0 left-0 bg-neutral-950/60"></div>
      <div className="w-[400px] absolute rounded-xl bg-neutral-900 overflow-hidden animate-[appear_0.05s_linear]">
        <div className="flex flex-col items-center justify-center gap-y-2 m-8">
          <h6 className="text-xl font-medium tracking-wide">{title}</h6>
          <p className="text-sm">{message}</p>
        </div>
        <div className="flex flex-col text-sm mt-4">
          <button
            className="h-12 text-rose-500 font-semibold border-t border-neutral-700 hover:bg-neutral-800"
            onClick={handleAccept}
          >
            {acceptText}
          </button>
          <button
            className="h-12 border-t border-neutral-700 hover:bg-neutral-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
