import React, { FC } from "react";
import style from "./styles.module.scss";
import { cn } from "@/shared/utils/cn";
import CrossSvg from "@/public/svg/cross.svg";
// import { PatternBg } from "@/shared/ui/PatternBg";
import { Physics } from "@/shared/ui/Physics";
import BlobDemo from "@/shared/ui/BlobCanvas";
import { BackgroundBeams } from "@/shared/ui/BackgroundBeams";

export const Section1 = () => {
  return (
    <section className="relative mb-[20lvh] h-[100lvh] w-full overflow-hidden bg-black">
      <BlobDemo className="absolute left-0 top-0 z-[2] h-[100vh] w-[100vw]" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-[10px] max-sm:items-end max-sm:pb-[150px]">
        <Title className="pointer-events-none z-[3]" />
        {/* <PatternBg className={cn("absolute left-0 top-0 z-[1] px-[10px]")} /> */}
      </div>

      <BackgroundBeams />

      <Physics
        className={cn(
          "pointer-events-none absolute bottom-[-200px] left-[10%] z-[4] max-sm:bottom-[-100px]",
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
        "text-[180px] font-semibold leading-[140px] tracking-[-9px] text-white max-sm:text-[15vw] max-sm:leading-[14vw]",
        props.className,
      )}
    >
      fullstack <br />
      <span className={cn("stroke-slate-50 text-transparent", style.title)}>web</span> <br />{" "}
      development
    </h1>
  );
};
