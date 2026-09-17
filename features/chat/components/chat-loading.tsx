export function ChatLoading() {
  return (
    <div className="flex flex-1 items-center justify-center py-20" role="status">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span
          className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary-foreground motion-reduce:animate-none"
          aria-hidden="true"
        />
        Loading threads…
      </div>
    </div>
  );
}
