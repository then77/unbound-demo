import Image from "next/image";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string | null;
  className?: string;
}) {
  const classes = cn(
    "size-10 shrink-0 rounded-full border border-border object-cover",
    className,
  );

  if (src) {
    return (
      <Image
        src={src}
        alt={`${name}'s avatar`}
        width={64}
        height={64}
        className={classes}
        unoptimized
      />
    );
  }

  return (
    <span
      aria-label={`${name}'s avatar`}
      className={cn(
        classes,
        "inline-flex items-center justify-center bg-muted text-xs font-semibold text-muted-foreground",
      )}
    >
      {getInitials(name)}
    </span>
  );
}
