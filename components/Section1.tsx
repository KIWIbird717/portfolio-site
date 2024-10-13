"use client";

import React, { FC, ReactNode, useRef } from "react";
import style from "./styles.module.scss";
import { cn } from "@/shared/utils/cn";
import dynamic from "next/dynamic";
import { Transition, useAnimationFrame } from "framer-motion";
import CrossSvg from "@/public/svg/cross.svg";
import { random } from "@/shared/utils/random";
import CrossForPattern from "@/public/svg/cross-for-pattern.svg";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

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

const Pattern: FC = () => {
  return (
    <div className="relative -m-[1px] aspect-square border-[1px] border-[#2a2a2a]">
      <CrossForPattern className="absolute left-0 top-0 translate-x-[-50%] translate-y-[-50%]" />
      <CrossForPattern className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%]" />
    </div>
  );
};

type PatternBgProps = {
  className?: string;
};
const PatternBg: FC<PatternBgProps> = (props) => {
  const COLS = 10;
  const ROWS = 10;

  return (
    <div className={cn("grid w-full grid-cols-10 gap-0 max-sm:grid-cols-5", props.className)}>
      {Array.from({ length: COLS * ROWS }).map((_, index) => (
        <Pattern key={`pattern-${index}`} />
      ))}
    </div>
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
