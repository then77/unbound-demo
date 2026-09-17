import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap outline-none select-none transition-colors focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-foreground hover:bg-primary/80",
        outline:
          "border-border bg-muted/30 text-foreground hover:bg-muted/60",
        ghost: "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        danger: "bg-danger text-foreground hover:bg-danger/80",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        default: "h-11 px-5",
        lg: "h-12 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
