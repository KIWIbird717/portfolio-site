import React, { FC } from "react";
import style from "./styles.module.scss";
import { cn } from "@/shared/utils/cn";
import CrossSvg from "@/public/svg/cross.svg";
import { PatternBg } from "@/shared/ui/PatternBg";
import { Physics } from "@/shared/ui/Physics";

export const Section1 = () => {
  return (
    <section className="relative mb-[20lvh] h-[100lvh] w-full overflow-hidden bg-black">
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-[10px] max-sm:items-end max-sm:pb-[150px]">
        <Title className="z-[2]" />
        <PatternBg className="absolute left-0 top-0 z-[1]" />
      </div>
      <Physics
        className={cn(
          "absolute bottom-[-200px] left-[10%] z-[2] max-sm:bottom-[-100px]",
          style.cross,
        )}
      >
        <CrossSvg className="aspect-square w-[70lvh] max-sm:w-[55lvh]" />
      </Physics>
    </section>
  );
};

type TitleProps = {
  className?: string;
};
const Title: FC<TitleProps> = (props) => {
  return (
    <h1
      className={cn(
        "text-[180px] font-semibold leading-[140px] text-white max-sm:text-[15vw] max-sm:leading-[14vw]",
        props.className,
      )}
    >
      fullstack <br />
      <span className={cn("stroke-slate-50 text-transparent", style.title)}>web</span> <br />{" "}
      development
    </h1>
  );
};
