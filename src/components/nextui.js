"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function NextUi({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
