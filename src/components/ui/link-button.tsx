import type { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-accent text-accent-contrast hover:opacity-90",
  secondary: "border border-line bg-surface text-ink hover:border-accent",
};

export function LinkButton({
  className = "",
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
