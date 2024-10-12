"use client";

import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

export const Section2 = () => {
  return (
    <MotionDiv className="flex h-[100lvh] w-full flex-col items-center justify-between bg-[#171717]">
      <h1 className="text-[80px] font-extrabold text-white">Start Section 2</h1>
      <h1 className="text-[80px] font-extrabold text-white">Section 2</h1>
      <h1 className="text-[80px] font-extrabold text-white">End Section 2</h1>
    </MotionDiv>
  );
};
