import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-lg font-extrabold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground"
      >
        U
      </span>
      <span>Unbound</span>
    </Link>
  );
}
