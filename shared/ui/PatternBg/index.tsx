"use client";

import CrossForPattern from "@/public/svg/cross-for-pattern.svg";
import { cn } from "@/shared/utils/cn";
import dynamic from "next/dynamic";
import { FC } from "react";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type PatternBgProps = {
  className?: string;
};
export const PatternBg: FC<PatternBgProps> = (props) => {
  const COLS = 10;
  const ROWS = 13;

  return (
    <div className={cn("grid w-full grid-cols-10 gap-0 max-sm:grid-cols-5", props.className)}>
      {Array.from({ length: COLS * ROWS }).map((_, index) => (
        <Pattern key={`pattern-${index}`} delay={index * 0.01} />
      ))}
    </div>
  );
};

type PatternProps = {
  delay: number;
};

const Pattern: FC<PatternProps> = (props) => {
  return (
    <MotionDiv
      className="relative -m-[1px] aspect-square origin-top-left border-[1px] border-[#2a2a2a]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: props.delay }}
    >
      <CrossForPattern className="absolute left-0 top-0 translate-x-[-50%] translate-y-[-50%]" />
      <CrossForPattern className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%]" />
    </MotionDiv>
  );
};
