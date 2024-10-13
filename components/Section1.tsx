"use client";

import React, { FC, ReactNode, useRef } from "react";
import style from "./styles.module.scss";
import { cn } from "@/shared/utils/cn";
import dynamic from "next/dynamic";
import { Transition, useAnimationFrame } from "framer-motion";

import CrossSvg from "@/public/svg/cross.svg";
import Polygon1Svg from "@/public/svg/polygon1.svg";
import Polygon2Svg from "@/public/svg/polygon2.svg";
import EllipseSvg from "@/public/svg/ellipse.svg";
import { random } from "@/shared/utils/random";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

export const Section1 = () => {
  return (
    <section className="relative mb-[20lvh] h-[100lvh] w-full overflow-hidden bg-black">
      <div className="mx-auto flex h-full max-w-[1280px] items-center">
        <Title />
      </div>

      <Physics className={cn("absolute bottom-[-200px] left-[-10%] z-[1] max-sm:hidden")}>
        <EllipseSvg className="aspect-square w-[50lvh] max-sm:w-[55lvh]" />
      </Physics>
      <Physics
        className={cn("absolute bottom-[-200px] left-[10%] z-[2]", style.cross)}
        rotate={{ offset: -180 }}
        animation={{ delay: 0.3 }}
      >
        <CrossSvg className="aspect-square w-[70lvh] max-sm:w-[55lvh]" />
      </Physics>
      <Physics
        className={cn("absolute bottom-[-200px] right-[20%] z-[1]")}
        animation={{ delay: 0.1 }}
      >
        <Polygon1Svg className="aspect-square w-[50lvh] max-sm:w-[55lvh]" />
      </Physics>
      <Physics
        className={cn("absolute bottom-[-200px] right-0 z-[1] max-sm:hidden")}
        animation={{ delay: 0.2 }}
      >
        <Polygon2Svg className="aspect-square w-[40lvh] max-sm:w-[55lvh]" />
      </Physics>
    </section>
  );
};

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

const Physics: FC<PhysicsProps> = ({
  className,
  children,
  y = {},
  x = {},
  rotate = {},
  animation = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const yDefaultParams = {
    offset: 1,
    amplitude: random(1, 40, 1),
    frequency: random(900, 1100, 1),
  };
  const xDefaultParams = {
    offset: 1,
    amplitude: random(1, 40, 1),
    frequency: random(900, 1100, 1),
  };
  const rotateDefaultParams = {
    offset: -8,
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

const Title = () => {
  return (
    <h1 className="font-[Degular] text-[180px] font-extrabold leading-[140px] text-white">
      fullstack <br />
      <span className={cn("stroke-slate-50 text-transparent", style.title)}>web</span> <br />{" "}
      development
    </h1>
  );
};
