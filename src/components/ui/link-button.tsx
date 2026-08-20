import type { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "border border-accent bg-accent text-accent-contrast hover:bg-ink hover:border-ink",
  secondary: "border border-line bg-surface text-ink hover:border-accent",
};

export function LinkButton({
  className = "",
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center px-7 text-xs font-semibold tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
