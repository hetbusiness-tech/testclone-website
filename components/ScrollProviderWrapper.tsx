"use client";

import SmoothScrollProvider from "./SmoothScrollProvider";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ScrollProviderWrapper({ children }: Props) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
