/** A stat shown inside concentric tree rings. */
export function TreeRingStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="1" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="var(--border)" strokeWidth="1" />
          <circle cx="60" cy="60" r="26" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
        <p className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
          {value}
        </p>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
