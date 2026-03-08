type PageSectionProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}>;

export default function PageSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section
      className={`rounded-[2rem] border border-stone-800/80 bg-stone-950/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-8 ${className}`.trim()}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10">
        <header className="space-y-4">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.32em] text-amber-400">
            {eyebrow}
          </p>
          <div className="space-y-3">
            <h2 className="max-w-sm text-2xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-md text-sm leading-7 text-stone-300 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
