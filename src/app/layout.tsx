import type { Metadata } from "next";
import type { ReactNode } from "react";

import { celebration } from "@/content/celebration";

import "./globals.css";

export const metadata: Metadata = {
  title: `${celebration.names.join(" & ")} | MemoriesBB`,
  description: celebration.texts.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
