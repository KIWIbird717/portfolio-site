"use client";

import { FC, ReactNode, useRef } from "react";
import { useScroll, useTransform, cubicBezier } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/shared/utils/cn";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

type ScaleIntoSectionProps = {
  className?: string;
  children?: ReactNode;
  offset?: UseScrollOptions["offset"];
  outputRangeX?: [string, string];
  outputRangeY?: [string, string];
};

export const ScaleIntoSection: FC<ScaleIntoSectionProps> = ({
  className,
  children,
  offset = ["start 30%", "end 90%"],
  outputRangeX = ["0%", "400%"],
  outputRangeY = ["0%", "0%"],
}) => {
  const cubicBezierAnimation = cubicBezier(0.94, 0.02, 0.86, 1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 150], {
    ease: cubicBezierAnimation,
  });
  const x = useTransform(scrollYProgress, [0, 1], outputRangeX, {
    ease: cubicBezierAnimation,
  });
  const y = useTransform(scrollYProgress, [0, 1], outputRangeY, {
    ease: cubicBezierAnimation,
  });

  return (
    <section
      ref={containerRef}
      className={cn("my-[-1px] h-[220lvh] py-[50px] contain-paint", className)}
    >
      <div className="sticky top-[calc(100lvh/2)] flex translate-y-[-50%] justify-center">
        <MotionDiv style={{ scale, x, y }}>{children}</MotionDiv>
      </div>
    </section>
  );
};
