interface TooltipProps {
  content: string;
  isVisible: boolean;
}

export function Tooltip({ content, isVisible }: TooltipProps): JSX.Element {
  return (
    <div
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 mb-2 px-2 py-1 text-sm text-white bg-black/70 rounded whitespace-nowrap font-[Roboto] z-30 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      {content}
    </div>
  );
}
