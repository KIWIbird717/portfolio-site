"use client";

import { MotionValue, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import React, { FC, useMemo, useRef } from "react";

const MotionSpan = dynamic(() => import("framer-motion").then((mod) => mod.motion.span));

type TextGenerateOnScrollProps = {
  text: string;
};

export const TextGenerateOnScroll: FC<TextGenerateOnScrollProps> = (props) => {
  const words = useMemo(() => props.text.split(" "), [props.text]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30vh", "end 109vh"],
  });

  return (
    <section
      ref={containerRef}
      className="mx-auto min-h-[200lvh] max-w-[1280px] px-[10px] py-[20vh]"
    >
      <div
        ref={containerRef}
        className="sticky top-[calc(100lvh/2)] h-fit translate-y-[-50%] max-sm:top-[70px] max-sm:translate-y-[-0%]"
      >
        {words.map((word, index) => {
          const start = index / words.length;
          const end = (index + 1) / words.length;

          return (
            <Word
              key={`${word}-${index}`}
              scrollYProgress={scrollYProgress}
              index={index}
              word={word}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </section>
  );
};

type WordProps = {
  index: number;
  word: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
};
const Word: FC<WordProps> = (props) => {
  const opacity = useTransform(
    props.scrollYProgress,
    [parseFloat(props.start.toFixed(2)), parseFloat(props.end.toFixed(2))],
    [0.1, 1],
  );

  return (
    <MotionSpan
      className="h-fit text-[3.7vw] font-extrabold leading-[3.8vw] tracking-tight max-sm:text-[35px] max-sm:leading-[37px]"
      style={{ opacity }}
    >
      {props.word}{" "}
    </MotionSpan>
  );
};
