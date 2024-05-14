"use client";

import { PropsWithChildren } from "react";

import { Providers } from "./ReduxProvider";

export default function Provider({ children }: PropsWithChildren<any>) {
  return <Providers>{children}</Providers>;
}
