"use client";

import React, { FC, ReactNode, useRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Transition, useAnimationFrame } from "framer-motion";
import { random } from "@/shared/utils/random";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type MotionParams = {
  offset: number;
  amplitude: number;
  frequency: number;
};

type PhysicsProps = {
  className?: string;
  children?: ReactNode;
  y?: Partial<MotionParams>;
  x?: Partial<MotionParams>;
  rotate?: Partial<MotionParams>;
  animation?: Pick<Transition, "delay">;
};

const animationDefaultProps: PhysicsProps["animation"] = { delay: 0 };

export const Physics: FC<PhysicsProps> = ({
  className,
  children,
  y = {},
  x = {},
  rotate = {},
  animation = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const yDefaultParams = {
    offset: random(1, 2, 1),
    amplitude: random(1, 40, 1),
    frequency: random(900, 1100, 1),
  };
  const xDefaultParams = {
    offset: random(1, 5, 1),
    amplitude: random(1, 40, 1),
    frequency: random(900, 1100, 1),
  };
  const rotateDefaultParams = {
    offset: random(-30, 30, 1),
    amplitude: random(10, 40, 1),
    frequency: random(900, 1100, 1),
  };

  const yParams = { ...yDefaultParams, ...y };
  const xParams = { ...xDefaultParams, ...x };
  const rotateParams = { ...rotateDefaultParams, ...rotate };
  const animationParams = { ...animationDefaultProps, ...animation };

  useAnimationFrame((time) => {
    if (!ref.current) return;

    const yDef = (yParams.offset + Math.sin(time / yParams.frequency)) * yParams.amplitude;
    const xDef = (xParams.offset + Math.cos(time / xParams.frequency)) * xParams.amplitude;
    const rotateDef =
      Math.abs(rotateParams.offset + Math.sin(time / rotateParams.frequency)) *
      rotateParams.amplitude;
    ref.current.style.transform = `translateY(${yDef}px) translateX(${xDef}px) rotate(${rotateDef}deg)`;
  });

  return (
    <MotionDiv
      className={cn("", className)}
      initial={{ y: "-150lvh", rotate: 90 }}
      animate={{
        y: "0lvh",
        rotate: 0,
        transition: {
          delay: animationParams.delay,
          type: "spring",
          velocity: -100,
          duration: 1,
          mass: 1,
          restDelta: 0.2,
          restSpeed: 0.1,
        },
      }}
    >
      <div ref={ref}>{children}</div>
    </MotionDiv>
  );
};
