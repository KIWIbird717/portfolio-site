import CrossForPattern from "@/public/svg/cross-for-pattern.svg";
import { cn } from "@/shared/utils/cn";
import { CSSProperties, FC } from "react";

type PatternBgProps = {
  className?: string;
  style?: CSSProperties;
};
export const PatternBg: FC<PatternBgProps> = (props) => {
  const COLS = 10;
  const ROWS = 13;

  return (
    <div
      style={props.style}
      className={cn("grid w-full grid-cols-10 gap-0 max-sm:grid-cols-5", props.className)}
    >
      {Array.from({ length: COLS * ROWS }).map((_, index) => (
        <Pattern key={`pattern-${index}`} />
      ))}
    </div>
  );
};

const Pattern: FC = () => {
  return (
    <div className="relative -m-[0.5px] aspect-square origin-top-left border-[0.5px] border-[#2a2a2a]">
      <CrossForPattern className="absolute left-0 top-0 translate-x-[-50%] translate-y-[-50%]" />
      <CrossForPattern className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%]" />
    </div>
  );
};
