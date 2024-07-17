"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import React from "react";
import { cn } from "~/lib/utils";

export const Lottie = ({
  src,
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
  src: string;
}) => {
  return (
    <DotLottiePlayer
      style={{ width, height }}
      className={cn("flex h-screen items-center justify-center", className)}
      autoplay
      loop
      src={src}
    />
  );
};
